// функция для случайного int в диапазоне

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// начальные глобальные переменные
var presentLevel = 1
var presentStage = 1
var remap = 0
var score = 0
var true_city = ""
var hintos = ""
mapboxgl.accessToken = 'pk.eyJ1IjoidHN1a2loaW1lIiwiYSI6ImNrcDQ0ampkZDFrZm0ydmxnbnBtc2w2b2kifQ.KpoESWG-G1z9THJFfLbXPA';





// функция отображения карты по уровню и этапу

function showMap(level, stage) {

  // создание массива городов для этого уровня на основе критериев уровня, стадии

  level_array = []

  if (level < 10) {
    for (var c in cities["features"]) {
      if (cities["features"][c]["properties"]["WORLDCITY"] > 0) {
        level_array.push(cities["features"][c])
      }
    }
  } else if (level >= 10 && level < 20) {
    for (var c in cities["features"]) {
      if (cities["features"][c]["properties"]["SCALERANK"] < 3) {
        level_array.push(cities["features"][c])
      }
    }
  } else if (level >= 20 && level < 30) {
    for (var c in cities["features"]) {
      if (cities["features"][c]["properties"]["MEGACITY"] > 0) {
        level_array.push(cities["features"][c])
      }
    }
  } else if (level >= 30 && level < 40) {
    for (var c in cities["features"]) {
      if (cities["features"][c]["properties"]["GN_POP"] > 3000000) {
        level_array.push(cities["features"][c])
      }
    }
  } else if (level >= 40 && level < 50) {
    for (var c in cities["features"]) {
      if (cities["features"][c]["properties"]["GN_POP"] > 2000000) {
        level_array.push(cities["features"][c])
      }
    }
  } else if (level >= 50 && level < 60)
  for (var c in cities["features"]) {
    if (cities["features"][c]["properties"]["SCALERANK"] < 5) {
      level_array.push(cities["features"][c])
    }
  }
  else {
    for (var c in cities["features"]) {
      if (cities["features"][c]["properties"]["SCALERANK"] < 12) {
        level_array.push(cities["features"][c])
      }
    }
  };


  // случайные 4 города из массива городов

  rand_m0 = getRandomInt(0, level_array.length - 1)
  rand_m1 = getRandomInt(0, level_array.length - 1)
  while (rand_m1 === rand_m0) {
    rand_m1 = getRandomInt(0, level_array.length - 1)
  }
  rand_m2 = getRandomInt(0, level_array.length - 1)
  while (rand_m2 === rand_m0 || rand_m2 === rand_m1) {
    rand_m2 = getRandomInt(0, level_array.length - 1)
  }
  rand_m3 = getRandomInt(0, level_array.length - 1)
  while (rand_m3 === rand_m0 || rand_m3 === rand_m1 || rand_m3 === rand_m2) {
    rand_m3 = getRandomInt(0, level_array.length - 1)
  }


  // создание массива только этих городов

  var cities_select = [level_array[rand_m0],level_array[rand_m1],level_array[rand_m2],level_array[rand_m3]]


  // правильный ответ

  rand_i = getRandomInt(0, 3)

  p_score = score + 100 * (5 + 5 * (1 - cities_select[rand_i]["properties"]["WORLDCITY"]) + parseInt(cities_select[rand_i]["properties"]["SCALERANK"]))


  // настройка карты в центре города

  var cx = cities_select[rand_i]["geometry"]["coordinates"][0]
  var cy = cities_select[rand_i]["geometry"]["coordinates"][1]

  true_city = cities_select[rand_i]["properties"]["NAME"]
  hintos = cities_select[rand_i]["properties"]["HINT"]

  var bounds = [
      [cx - 0.42, cy - 0.42], // Southwest
      [cx + 0.42, cy + 0.42]  // Northeast
  ];
   
   // первый уровень сложности
  if (presentLevel<10)
  {
	  var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/tsukihime/ckp49elop10wp18moc7p39kbj', // карта из мапбокса
      center: [cx,cy], // начальная позиция
      zoom: 13, // начальный зум
      maxZoom: 16,
      minZoom: 12.5,
      maxBounds: bounds // установка границ
  })
  }
  // второй уровень
  else if(presentLevel>=10 && presentLevel<20)
  {
	  var map = new mapboxgl.Map({
      container: 'map', 
      style: 'mapbox://styles/tsukihime/ckp48901583wl17p4y5mwbm02',
      center: [cx,cy], 
      zoom: 13,
      maxZoom: 16,
      minZoom: 12.5,
      maxBounds: bounds
  })
  }
  // третий уровень
  else if(presentLevel>=20)
  {
	  var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/tsukihime/ckp48cwlc0mhp18oj08fflk9o',
      center: [cx,cy],
      zoom: 13,
      maxZoom: 16,
      minZoom: 12.5,
      maxBounds: bounds
  })
  };


  // добавление элементов управления на карту
  if (level > 1 || remap > 0) {
    map.removeControl(nav)
    map.removeControl(bar)
  }

  nav = new mapboxgl.NavigationControl();
  map.addControl(nav, 'top-left');

  bar = new mapboxgl.ScaleControl({
    maxWidth: 100,
    unit: 'metric'
  });
  map.addControl(bar);
   map.dragRotate._pitchWithRotate = true;

  // добавление имен в форму

  document.getElementById("point1").innerHTML = "<b>" + cities_select[0]["properties"]["NAME"] + "</b>, " + cities_select[0]["properties"]["ADM0NAME"]
  document.getElementById("point2").innerHTML = "<b>" + cities_select[1]["properties"]["NAME"] + "</b>, " + cities_select[1]["properties"]["ADM0NAME"]
  document.getElementById("point3").innerHTML = "<b>" + cities_select[2]["properties"]["NAME"] + "</b>, " + cities_select[2]["properties"]["ADM0NAME"]
  document.getElementById("point4").innerHTML = "<b>" + cities_select[3]["properties"]["NAME"] + "</b>, " + cities_select[3]["properties"]["ADM0NAME"]
  document.getElementById("hint").innerHTML = hintos;

};


// показать исходную карту

showMap(presentLevel,presentStage)



// функция для того, что происходит при нажатии кнопки "Отправить"

function submitAnswers() {

  // похвала

  var succes = ["Yes!!","Так держать","Верно!","Вы на верном пути","Чудесно!","Супер!",":)","Perfecto","Еще чуть-чуть!","Ура!","Класс"]

  //получить значение результата (от 1 до 4)

  var q = document.forms['quizForm']['question'].value;
  console.log(eval(q))


  // правильный ответ

  if (eval(q) === rand_i + 1) {
    console.log("true")
    //новый уровень
    presentLevel = presentLevel + 1
    // следующщая мапа
    showMap(presentLevel,presentStage)

    // обновить уровень
    var count_score = parseInt(document.getElementById("level").innerHTML) + 1
    document.getElementById("level").innerHTML = count_score + ""

    // обновить счет
    score = p_score
    document.getElementById("score").innerHTML = score + ""
    // вывод очков и уровня
    var endScore = document.getElementById("hscore").innerHTML
    var endLevel = document.getElementById("hlevel").innerHTML

    if (presentLevel > endLevel) {
      document.getElementById("hlevel").innerHTML = (presentLevel - 1) + ""
    }

    if (score > endScore) {
      document.getElementById("hscore").innerHTML = score + ""
    }
    // вывод в случае правильного ответа
    document.getElementById("message").innerHTML = succes[getRandomInt(0, succes.length - 1)]

    var sectionback = document.getElementById("section");
	sectionback.classList.remove("transitionColor2");
	sectionback.classList.remove("transitionColor");
	void sectionback.offsetWidth; 
	sectionback.classList.add("transitionColor2");
  }

  // неправильный ответ

  else {

    console.log("false")

    // say game over
    document.getElementById("message").innerHTML = "<b>Печально,но вы проиграли :(</b> <br><br>&nbsp;Верным был ответ<br>&nbsp;" + true_city + "<br><br>&nbsp;Пожалуйста,попробуй снова"



    // обновление очков и старт новой игры
    presentLevel = 1
    presentStage = 1
    remap = 1
    p_score = 0
    score = 0
    showMap(presentLevel,presentStage)
    document.getElementById("score").innerHTML = "0"
    document.getElementById("level").innerHTML = "1"

    // бэк
    var sectionback = document.getElementById("section");
	sectionback.classList.remove("transitionColor");
	sectionback.classList.remove("transitionColor2");
	void sectionback.offsetWidth; 
	sectionback.classList.add("transitionColor");



    // if score
    //document.getElementById("code").innerHTML = "<br>your final score was " + score + "<br> that's quite shite <br>";

  }

  return false;
}
