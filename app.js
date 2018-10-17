"use strict";

const allHorns = [];
var uniqueNames = [];

function Horn (hornObject) {
    this.image_url = hornObject.image_url;
    this.title = hornObject.title;
    this.description = hornObject.description;
    this.keyword = hornObject.keyword;
    this.horns = hornObject.horns;

    allHorns.push(this);
}

// function clickHandler () {
//     $('select').click(function (event) {
//         let menuChildren = $('select').children();
//         allHorns.forEach(function(animal) {
//             if(event.text !== animal.keyword){
//                 animal.attr('hidden');
//             }
//         })
//     })
// }

Horn.prototype.render = function(){
    $('main').append('<div class = "newAnimal"></div>');
    let $hornContainer = $('div[class = "newAnimal"]');
    console.log($hornContainer);

    let $templateHTML = $('#photo-template').html();
    // console.log($templateHTML);
    $hornContainer.html($templateHTML);

    $hornContainer.find('h2').text(this.title);
    $hornContainer.find('img').attr('src', this.image_url);
    $hornContainer.find('p').text(this.description);

    $hornContainer.attr('class', '');
}

const readJSON = function(){
    $.get('./page-1.json', data => {
      data.forEach(animal => {
  
          new Horn(animal);

      })
    //   filterAllHorns();
      findUnique();
      filter();
    //   clickHandler();
    }).then(renderAllHorns);
    

}

function filter() {
    uniqueNames.forEach(value =>{
    $('select').append('<option class = newItem></option>');
    let $newOption = $('option[class = "newItem"]');

    $newOption.text(value);

    $newOption.attr('class', '');
})
}

function renderAllHorns () {
    allHorns.forEach(animal => {
      animal.render();
    })
}

// function filterAllHorns(){
//     allHorns.forEach(animal => {
//         animal.filter();
//     })
// }

function findUnique(){
    console.log('we mad it in to the function')
    console.log(allHorns.length);
    for(let i = 0; i < allHorns.length; i++){
        console.log('we made it into the for loop')
        if (!uniqueNames.includes (allHorns[i].keyword)){
            uniqueNames.push(allHorns[i].keyword);
        } 
    }
    console.log('these are the ', uniqueNames);
}
readJSON();
