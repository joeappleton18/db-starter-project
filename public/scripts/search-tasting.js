
const handleSave = async (id) => {
  await fetch('/api/saved-tasting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: id})
  })
};


const wineView = (wine) => `

<div class="col-12">
    <div class="card">
        <h5 class="card-header"> ${wine.title} <strong>(search match: ${wine.score})</strong></h5>
        <div class="card-body">
         <p class="card-text">${wine.description}</p>
          <ul class="list-group">
               <li class="list-group-item">Country: ${wine.taster_name}</li>
                <li class="list-group-item">Country: ${wine.country}</li>
                <li class="list-group-item">Designation: ${wine.designation}</li>
                <li class="list-group-item">Points: ${wine.points}</li>
                <li class="list-group-item">Price: ${wine.price}</li>
                <li class="list-group-item">Province: ${wine.province}</li>
          </ul>
        </div>
        <a href="#" class="btn btn-primary" onclick="handleSave('${wine._id}')">Save</a>
      </div>
 </div>
`;


const handleSubmit = async () => {
    const searchVal = document.querySelector("#searchInput").value;
    try {
        const wineDomRef = document.querySelector('#wineItems');
        const ref = await fetch(`/api/search-tastings/?search=${searchVal}`);
        const searchResults = await ref.json();
        let wineHtml = [];
        searchResults.forEach(wine => {
           wineHtml.push(wineView(wine));
        });
        wineDomRef.innerHTML = wineHtml.join(""); 
    } catch (e) {
        console.log(e);
        console.log('could not search api');
    }
  
}