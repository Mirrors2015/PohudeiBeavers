console.log(1111);
// const photo = document.querySelector("#photo"); // убрать?


async function a() {
  const responce = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  let jsonFromBack = await responce.json();
  photo.src = `/images/${jsonFromBack.key}`;
}
setInterval(a, 1000);



// =========================КОПИРОВАНО=========================================
const minEating = 1000;
const maxEating = 2200;
const breackfastPocent = 30;
const dinnerPocent = 35;
const dinnerNightProcent = 25;
const snackProcent = 10;

const cCalForm = document.querySelector("#cCalForm");


cCalForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let planFood = event.target.planFood.value; // значение БЖУ 25.25.50

  let kall = Number(event.target.minCCal.value); // значение введенных каллорий

  planFood = planFood.split("/"); // разбиваем БЖУ на массив
  let proteins = Math.round((kall * (planFood[0] / 100)) / 4); //  переводим проценты в количество грамм в день, 75 гр (суточная норма)
  let fats = Math.round((kall * (planFood[1] / 100)) / 9); // считаем жиры 33 гр (суточная норма)

  let carbohydrates = Math.round((kall * (planFood[2] / 100)) / 4); // считаем углеводы 150 гр (суточная норма)
  

  //Расчет БЖУ для завтрака
  let proteinsB = Math.round(proteins * (breackfastPocent / 100)); //процент протеинов для завтрака
  let fatsB = Math.round(fats * (breackfastPocent / 100)); //процент протеинов для завтрака
  let carbohydratesB = Math.round(carbohydrates * (breackfastPocent / 100)); //процент протеинов для завтрака
  // Расчет БЖУ для обеда
  //=======================Пишу я =====================================
  let proteinsD = Math.round(proteins * (dinnerPocent / 100)); //процент протеинов для обеда
  let fatsD = Math.round(fats * (dinnerPocent / 100)); //процент протеинов для обеда
  let carbohydratesD = Math.round(carbohydrates * (dinnerPocent / 100)); //процент протеинов для обеда

  // //Расчет БЖУ для ужина
  let proteinsN = Math.round(proteins * (dinnerNightProcent / 100)); //процент протеинов для ужина
  let fatsN = Math.round(fats * (dinnerNightProcent / 100)); //процент протеинов для ужина
  let carbohydratesN = Math.round(carbohydrates * (dinnerNightProcent / 100)); //процент протеинов для ужина

  console.log("protiki", proteinsD);
  console.log("fats", fatsD);
  console.log("carbohydrates", carbohydratesD);
  
  const ul = await document.querySelector("#ulList");
  
  ul.innerHTML = "";
  
  if (kall >= minEating && kall <= maxEating) {
    const result = await fetch("/constructor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        minimum: kall - 100,
        maximum: kall + 100,
        proteinsB,
        fatsB,
        carbohydratesB,
        proteinsD,
        fatsD,
        carbohydratesD,
        proteinsN,
        fatsN,
        carbohydratesN
      }),
    });
    
    const res = await result.json();
    
    

    let keys = Object.values(res);
    
    keys.forEach((obj) => {
      switch (obj[0].mealTime) {
        case "Завтрак":
          const breackfast = document.createElement("h1");
          
          breackfast.innerText = `${obj[0].mealTime}`;
          ul.appendChild(breackfast);
          break;
          case "Обед":
            const obed = document.createElement("h1");
            obed.innerText = `${obj[0].mealTime}`;
            ul.appendChild(obed);
            break;
            case "Ужин":
          const yahin = document.createElement("h1");
          yahin.innerText = `${obj[0].mealTime}`;
          ul.append(yahin);
          break;
        default:
          break;
      }

      obj.forEach((element) => {
        const li = document.createElement("li");
        li.innerText = `${element.title}`;
        li.id = element._id
        
        ul.appendChild(li);
      });
    });
  } else {
    console.log("Error");
  }
});
