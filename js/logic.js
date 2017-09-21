"use strict";
var orderItem = document.querySelector('.order-item');/*only first item*/
var ordersWrapper = document.querySelector('.orders-wrapper');
var labelOne = document.querySelector('.js-label-1');
var labelTwo = document.querySelector('.js-label-2');
var labelThree = document.querySelector('.js-label-3');
var labelFour = document.querySelector('.js-label-4');
var labelFive = document.querySelector('.js-label-5');

/*Header text ASIDE*/
var header = document.querySelector('#aside-header-text');
header.innerText = 'Orders(' + (Orders.length) + ')';

/*ORDERS LIST*/
/*just adding items without content*/
if (Orders.length == 0) {
  orderItem.style.display = 'none';
} else {
  for (var i = 1; i < Orders.length; i++) {
    var newOrderItem = document.createElement('div');
    newOrderItem.className = 'order-item';
    var html = [
      '<div>',
        '<span class="order-word">' + 'Order ' + '</span>',
        '<span class="order-number"></span>',
        '<p class="customer"></p>',
        '<span>' + 'Shipped: ' + '</span>',
        '<span class="shipped-at"></span>',
      '</div>',
      '<div class="text-right">',
        '<p class="order-date"></p>',
        '<p class="status">' + 'In time' + '</p>',
      '</div>'
    ].join("\n");
    newOrderItem.innerHTML = html;
    ordersWrapper.appendChild(newOrderItem);
  }
}

/*adding content to every order item aside*/
for (var i = 0; i < Orders.length; i++){
  document.querySelectorAll('.order-number')[i].innerText = Orders[i].id;
  document.querySelectorAll('.order-date')[i].innerText = Orders[i].OrderInfo.createdAt;
  document.querySelectorAll('.customer')[i].innerText = Orders[i].OrderInfo.customer;
  document.querySelectorAll('.shipped-at')[i].innerText = Orders[i].OrderInfo.shippedAt;
  document.querySelectorAll('.status')[i].innerText = Orders[i].OrderInfo.status;
}

var orderItems = document.querySelectorAll('.order-item');
/*Search*/
var searchInput = document.querySelector('.search-query');
var searchButton = document.querySelector('.fa-search');

searchInput.addEventListener('keyup', function(e){
  searchOrderItems();
});

searchButton.addEventListener('click', function(e){
  e.preventDefault(); // event object of searchButton
  searchOrderItems();
});

function searchOrderItems(){
  var text = searchInput.value.toLowerCase();
  var countNone = 0;
  Array.from(orderItems).forEach(function(item){
    var itemContent = item.textContent;
    if(itemContent.toLowerCase().indexOf(text) != -1){
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
      countNone++;
    }
  });
  header.innerText = 'Orders(' + (Orders.length - countNone) + ')';
}

/*Show details*/
contentFill(0); // by default it displays details of the first order
Array.from(orderItems).forEach(function(item){
  item.addEventListener('click', function(){
    removeHighlighting();
    /*following function passes index of order item :)*/
    contentFill(Array.from(item.parentNode.children).indexOf(item));
    item.classList.add('opened');
    removeIconHighlight();
    addIconHighlight(document.querySelector('.fa-truck'));
  });
})

function removeHighlighting(){
  for(var i = 0; i < ordersWrapper.children.length; i++ ) {
    ordersWrapper.children[i].classList.remove('opened');
  }
}

function contentFill(i){
  /*block 1  */
  fillOrderInfo(Orders[i]);
  /*block 2 Shipping Address*/
  fillShippingAddress(Orders[i]);
  fillShippingAddressByClick(Orders[i]);
  fillCustomerInfoByClick(Orders[i]);
  fillMapPictureByClick(Orders[i]);
  /*block 3 Line Items*/
  document.querySelector('.js-lineItemsHeader').innerText = 'Line Items (' + Orders[i].products.length + ')';
  cleanTable();
  createTableRows(Orders[i].products.length);
  fillTableRows(Orders[i].products.length, Orders[i]);
  quickSearchInTable(Orders[i].products.length);
}

function fillOrderInfo(orderNumber) {
    document.querySelector('.details-orderId').innerText = 'Order ' + orderNumber.id;
    document.querySelector('#details-customer').innerText = orderNumber.OrderInfo.customer;
    document.querySelector('#details-createdAt').innerText = orderNumber.OrderInfo.createdAt;
    document.querySelector('#details-shippedAt').innerText = orderNumber.OrderInfo.shippedAt;
    document.querySelector('.totalPrice').innerText = orderNumber.OrderInfo.totalPrice;
    document.querySelector('.currency').innerText = orderNumber.OrderInfo.currency;
}

function fillShippingAddress(orderNumber) {
  document.querySelector('.shipping-address-form').style.display = '';
  document.querySelector('.sh-addr-header-buttons').style.display = '';
  labelOne.innerText = 'Name: ';
  labelTwo.innerText = 'Street: ';
  labelThree.innerText = 'ZIP Code / City: ';
  labelFour.innerText = 'Region: ';
  labelFive.innerText = 'Country: ';
  document.querySelector('.underTabsHeader').innerText = 'Shipping Address';
  labelOne.nextSibling.innerText = orderNumber.ShipTo.name;
  labelTwo.nextSibling.innerText = orderNumber.ShipTo.Address;
  labelThree.nextSibling.innerText = orderNumber.ShipTo.ZIP;
  labelFour.nextSibling.innerText = orderNumber.ShipTo.Region;
  labelFive.nextSibling.innerText = orderNumber.ShipTo.Country;
}

function fillShippingAddressByClick(orderNumber) {
  var orderInfo = document.querySelector('.fa-truck');
  orderInfo.addEventListener('click', function() {
    fillShippingAddress(orderNumber);
    removeIconHighlight();
    addIconHighlight(orderInfo);
  });
}

function fillCustomerInfoByClick(orderNumber) {
  var customerInfo = document.querySelector('.fa-user-circle-o');
  customerInfo.addEventListener('click', function() {
    document.querySelector('.shipping-address-form').style.display = '';
    document.querySelector('.sh-addr-header-buttons').style.display = 'none';
    labelOne.innerText = 'First name: ';
    labelTwo.innerText = 'Last name: ';
    labelThree.innerText = 'Address: ';
    labelFour.innerText = 'Phone: ';
    labelFive.innerText = 'Email: ';
    document.querySelector('.underTabsHeader').innerText = 'Customer information';
    labelOne.nextSibling.innerText = orderNumber.CustomerInfo.firstName;
    labelTwo.nextSibling.innerText = orderNumber.CustomerInfo.lastName;
    labelThree.nextSibling.innerText = orderNumber.CustomerInfo.address;
    labelFour.nextSibling.innerText = orderNumber.CustomerInfo.phone;
    labelFive.nextSibling.innerText = orderNumber.CustomerInfo.email;
    removeIconHighlight();
    addIconHighlight(customerInfo);
  });
}

function fillMapPictureByClick(orderNumber) {
  var mapPicture = document.querySelector('.fa-map-marker');
  mapPicture.addEventListener('click', function() {
    document.querySelector('.shipping-address-form').style.display = 'none';
    document.querySelector('.sh-addr-header-buttons').style.display = 'none';
    document.querySelector('.underTabsHeader').innerText = 'Map Picture';
    removeIconHighlight();
    addIconHighlight(mapPicture);
  });
}

function cleanTable(){
  /*clean all except first tr (there are table headings)*/
  var table = document.querySelector('.items-table tbody');
  while (table.childNodes.length > 1) {
    table.removeChild(table.lastChild);
  }
}

function createTableRows(rowsQuantity){
  var columnsQuantity = document.querySelector('.js-tableRow').children.length;
  for(var i = 0; i < rowsQuantity; i++){
    var newRow = document.createElement('tr');
    for(var x = 0; x < columnsQuantity; x++) {
      newRow.innerHTML += '<td></td>';
    }
    newRow.lastChild.innerHTML = '<button class="fa fa-trash-o"></button>';
    document.querySelector('.line-items tbody').appendChild(newRow);
  }
}

function fillTableRows(rowsQuantity, orderNumber){
  for(var i = 1; i <= rowsQuantity; i++) {
    var table = document.querySelector('.line-items tbody');
    table.children[i].childNodes[0].innerHTML = '<strong>' + orderNumber.products[i-1].name +
    '</strong></br>' + orderNumber.products[i-1].id;
    table.children[i].childNodes[1].innerHTML = '<strong>' + orderNumber.products[i-1].price +
    ' </strong>' + orderNumber.products[i-1].currency;
    table.children[i].childNodes[2].innerText = orderNumber.products[i-1].quantity;
    table.children[i].childNodes[3].innerHTML = '<strong>' + orderNumber.products[i-1].totalPrice +
    ' </strong>' + orderNumber.products[i-1].currency;
  }
}

function removeIconHighlight(){
  var icons = document.querySelector('.second-row').children;
  for (var i = 0; i < icons.length; i++) {
    icons[i].classList.remove("active");
  }
}

function addIconHighlight(element) {
  element.classList.add('active');
}

/*SEARCH BY ALL COLUMN*/
function quickSearchInTable(rowsQuantity) {
  var input = document.querySelector('.js-quickSearchTable');
  input.addEventListener('keyup', function() {
    var searchText = input.value.toUpperCase();
    var table = document.querySelector('.items-table');
    var tr = table.getElementsByTagName("tr");
    var columnsQuantity = document.querySelector('.js-tableRow');
    for (var rowIndex = 0; rowIndex < tr.length; rowIndex++) {
      for (var columnIndex = 0; columnIndex < columnsQuantity.children.length; columnIndex++) {
        var td = tr[rowIndex].getElementsByTagName("td")[columnIndex];
        if (td) {
          if (td.innerHTML.toUpperCase().indexOf(searchText) != -1) {
            tr[rowIndex].style.display = '';
            break;
          } else {
            tr[rowIndex].style.display = 'none';
          }
        }
      }
    }
    if (input.value == ''){
      document.querySelector('.js-lineItemsHeader').innerText = 'Line Items (' + rowsQuantity + ')';
    } else {
      document.querySelector('.js-lineItemsHeader').innerText = 'Line Items';
    }
  });
}

function sortColumn(indexColumn) {
  var table = document.querySelector('.items-table');
  var rows = table.getElementsByTagName("tr");
  var direction = "asc", switching = true, shouldSwitch, switchCount = 0;
  var rowOne, rowTwo;
  while (switching) {
    switching = false;
    for (var i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      rowOne = rows[i].getElementsByTagName('td')[indexColumn];
      rowTwo = rows[i+1].getElementsByTagName('td')[indexColumn];
      if (direction == "asc") {
        if (rowOne.innerHTML.toLowerCase() > rowTwo.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (direction == "desc") {
        if (rowOne.innerHTML.toLowerCase() < rowTwo.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchCount++;
    } else {
      if (switchCount == 0 && direction == "asc") {
        direction = "desc";
        switching = true;
      }
    }
  }
}
