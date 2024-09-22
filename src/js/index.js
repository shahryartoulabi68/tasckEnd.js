


const btnLod = document.querySelector(".btnlod")
const searchBox = document.querySelector(".searchbox")
const tableBox = document.querySelector(".tablebox")
const tableBody = document.querySelector(".tabody")
const chevronPrice = document.querySelector(".chevronprice")
const chevronDate=document.querySelector(".chevrondate")
const inputSearch = document.querySelector(".inputSearch")


let items = []
let filterSearch=""

btnLod.addEventListener("click", (e) => {
    e.preventDefault();
    btnLod.classList.add("hidden")
    searchBox.classList.remove("hidden")
    tableBox.classList.remove("hidden")
    axios.get("http://localhost:3000/transactions")
        .then((e) => {
            items = e.data
            createDom(items)
        })
        .catch((err) => console.log(err))
})

function createDom(items) {
    const itemAll = items
    let result = ""
    itemAll.forEach(item => {
        result += `
        <tr>
          <td>${item.id}</td>
          <td>${item.type}</td>
          <td>${item.price}</td>
          <td>${item.refId}</td>
          <td>${new Date(item.date).toLocaleString("fa")}</td>
        </tr>`
    });
    tableBody.innerHTML = result

}
// search
function search(){
    inputSearch.addEventListener("input", (e) => {
    filterSearch = e.target.value;
    axios.get(`http://localhost:3000/transactions?refId_like=${filterSearch}`)
        .then((e) => createDom(e.data))
})
}

// sort
function sortItem() {
    chevronPrice.addEventListener("click", () => {
        let sort = "";
        chevronPrice.classList.toggle("rotate");
        if (chevronPrice.classList.contains("rotate")) sort = "desc";
        else sort = "asc"
        axios.get(`http://localhost:3000/transactions?refId_like=${filterSearch}&_sort=price&_order=${sort}`)
            .then((e) => {
                items = e.data
                createDom(items)
            })
            .catch((e) => console.log(e))
    })
    chevronDate.addEventListener("click",()=>{
        let sort = "";
        chevronDate.classList.toggle("rotate");
        if (chevronDate.classList.contains("rotate")) sort = "desc";
        else sort = "asc"
        axios.get(`http://localhost:3000/transactions?refId_like=${filterSearch}&_sort=date&_order=${sort}`)
            .then((e) => {
                items = e.data
                createDom(items)
            })
            .catch((e) => console.log(e))
    })

}
sortItem()
search()
