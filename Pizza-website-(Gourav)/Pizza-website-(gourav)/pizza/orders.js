var items = []

if (sessionStorage.getItem('cart') === null) {
  sessionStorage.setItem('cart', JSON.stringify(items))
}

function additem(item, price) {
  items = JSON.parse(sessionStorage.cart)
  
  var newitem = {
    name: item,
    price: price,
    qty: 1,
  }
  var i = 0,
    flag = 0
  items.forEach((element) => {
    if (element.name == newitem.name) {
      flag = 1
    }
    if (flag == 0) i++
  })
  if (flag == 0) items.push(newitem)
  else items.splice(i, 1)
  sessionStorage.setItem('cart', JSON.stringify(items))
  console.log(sessionStorage.cart)
}
var total = 0


function getitems() {
  var parent = document.getElementById('cart')
  console.log(parent)
  items = JSON.parse(sessionStorage.cart)
  console.log(sessionStorage.getItem('cart'))
  console.log(sessionStorage.cart)
  

  items.forEach((element) => {
    total = total + element.qty * element.price
    var newDiv = document.createElement('div')
    const lineBreak = document.createElement('br');
    newDiv.setAttribute('id', element.name)
    const name = document.createTextNode('Item: ' + element.name)
    const price = document.createElement('div')
    price.innerText = 'Price: $' + element.price
    const qty = document.createElement('div')
    qty.setAttribute('id', element.name + '-qty')
    qty.innerText = 'Qty: ' + element.qty
    var btndown = document.createElement('button')
    newDiv.appendChild(lineBreak);
    btndown.innerHTML = '-'
    btndown.onclick = function () {
      if (element.qty > 0) {
        element.qty--
        total = total - element.price
      }

      sessionStorage.setItem('cart', JSON.stringify(items))
      document.getElementById(element.name + '-qty').innerText =
        'Qty: ' + element.qty

      document.getElementById('total').innerText = 'total = $' + total
    }
    var btnup = document.createElement('button')
    btnup.innerHTML = '+'
    btndown.innerHTML = '-'
    btnup.onclick = function () {
      if (element.qty < 20) {
        element.qty++
        total = total + element.price
      }

      sessionStorage.setItem('cart', JSON.stringify(items))
      document.getElementById(element.name + '-qty').innerText =
        'Qty: ' + element.qty
      document.getElementById('total').innerText = 'total = $' + total
    }
    var btnremove = document.createElement('button')
    btnremove.innerHTML = 'remove'
    btnremove.onclick = function () {
      total = total - element.price * element.qty
      parent.removeChild(newDiv)
      var flag = 0
      var index = 0
      items.forEach((el) => {
        if (el.name == element.name) {
          flag = 1
        }
        if (flag == 0) index++
      })

      items.splice(index, 1)
      sessionStorage.setItem('cart', JSON.stringify(items))
      document.getElementById('total').innerText = 'total = $' + total
    }
    newDiv.appendChild(name)
    newDiv.appendChild(price)
    newDiv.appendChild(qty)
    newDiv.appendChild(btndown)
    newDiv.appendChild(btnup)
    newDiv.appendChild(btnremove)
    parent.appendChild(newDiv)
  })
  document.getElementById('total').innerText = 'total = $' + total
}

function logout(){
  console.log("in my fun")
  sessionStorage.removeItem('cart')
  window.location.href = 'index.html'
}
 
