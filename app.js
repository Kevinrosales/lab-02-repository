"use strict";

const allHorns = [];

function Horn (hornObject) {
    this.image_url = hornObject.image_url;
    this.title = hornObject.title;
    this.description = hornObject.description;
    this.keyword = hornObject.keyword;
    this.horns = hornObject.horns;

    allHorns.push(this);
}

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
    }).then(renderAllHorns);

}

function renderAllHorns () {
    allHorns.forEach(animal => {
      animal.render();
    })
}

// console.log(allHorns);
readJSON();
