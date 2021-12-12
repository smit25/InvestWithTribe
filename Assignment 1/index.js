const fetchData = () => {
    var apiUrl = 'https://www.gov.uk/bank-holidays.json'
    return fetch(apiUrl).then(response => {
    return Promise.resolve(response.json());
    }).then(data => {
    //console.log(data);
    return Promise.resolve(data);
  }).catch(err => {
    console.log('Error in fetching data');
  });
}

async function filterList () {
  //event.preventDefault()
  console.log('Smit')
  let select = document.getElementById('start').value
  let selectDate = new Date(select);
  let data = await fetchData();
  //console.log(parsedData)
  for(let country in data) {
    let x = data[country]["events"]
    console.log(x.length)
    filteredEvents = x.filter(function (event) {
      eventDate = new Date(event.date)
      return eventDate.getTime()!==selectDate.getTime();
    })
    data[country].events = filteredEvents;
    console.log(data[country].events.length)
    }
  showList(data)
  }

function showList(data) {
  console.log(data)
  var listDiv = document.getElementById('list');
  //listDiv.innerHTML = '';
  listDiv.innerHTML = "</br>"
  for(let country in data) {
    console.log(country)
    listDiv.innerHTML += "<h2>" + country + "</h2>"
    let list = "<table border = '1' class = 'center'>"
    list += "<tr><th>Title</th> <th>Date </th> <th> Notes </th> <th>Bunting </th> </tr>"
    for(let j = 0;j< data[country]["events"].length; j++) {
      let x = data[country]["events"][j]
      //console.log(x)
      list += "<tr><td>" + x.title + "</td><td>" + x.date + "</td><td>" + x.notes + "</td><td>" + x.bunting +"</td></tr>"
    }
    list += "</table> </br>"
    listDiv.innerHTML += list;
  }
  
}

async function showAll() {
  var parsedData = await fetchData();
  console.log(parsedData)
  showList(parsedData);
}


window.onload = showAll()
//let form = document.getElementById("choosedate")
//form.addEventListener("submit", filterList())