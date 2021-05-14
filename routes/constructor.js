const express = require("express");
const router = express.Router();
const Food = require("../models/food");

router.get("/", function (req, res, next) {
  res.render("partials/constructor");
});


// ================================================КОПИРОВАНО===================================
router.post("/", async (req, res) => {
  // Диапазон погрешности
  const procentFatalMax = 1.10; // максимальная погрешность
  const procentFatalMin = 0.85; // минимальная погрешность
  
  console.log("---------------", req.body);
  if (req.body) {
    // Минимальная и максимальная каллорийность для завтрака
    const { minimum, maximum } = req.body;
    const kallBreakfastMax = maximum * 0.3;
    const kallBreakfastMin = minimum * 0.3;
    // БЖУ для завтрака
    const proteinsB = req.body.proteinsB;
    const fatsB = req.body.fatsB;
    const carbohydratesB = req.body.carbohydratesB;
    console.log(proteinsB);
    // =======================Пишу я====================================
    // Минимальная и максимальная каллорийность для обеда
    const kallDinnerMax = maximum * 0.35;
    const kallDinnerMin = minimum * 0.35;
// БЖУ для обеда
const proteinsD = req.body.proteinsD;
const fatsD = req.body.fatsD;
const carbohydratesD = req.body.carbohydratesD;

 // Минимальная и максимальная каллорийность для ужина
 const kallNightDinnerMax = maximum * 0.25;
 const kallNightDinnerMin = minimum * 0.25;
// БЖУ для ужина
const proteinsN = req.body.proteinsN;
const fatsN = req.body.fatsN;
const carbohydratesN = req.body.carbohydratesN;


    // console.log("Max = ", kallBreakfastMax);
    // console.log("Min = ", kallBreakfastMin);
    // console.log("MaxproteinsB = ", Math.round(proteinsB * procentFatalMax));
    // console.log("MinproteinsB = ", Math.round(proteinsB * procentFatalMin));

    // console.log("fatsB = ", fatsB);
    // console.log("carbohydratesB = ", carbohydratesB);

    

    
    const breakfast = await Food.find({
      mealTime: "Завтрак",
      kall: { $gte: kallBreakfastMin, $lte: kallBreakfastMax },
      proteins: { $gte: Math.round(proteinsB * procentFatalMin),$lte: Math.round(proteinsB * procentFatalMax)},
    });

    const obed = await Food.find({ mealTime: "Обед",
    kall: { $gte: kallDinnerMin, $lte: kallDinnerMax },
    proteins: { $gte: Math.round(proteinsD * procentFatalMin),$lte: Math.round(proteinsD * procentFatalMax)},
   });
    const yzhin = await Food.find({ mealTime: "Ужин",
    kall: { $gte: kallNightDinnerMin, $lte: kallNightDinnerMax },
    proteins: { $gte: Math.round(proteinsN * procentFatalMin),$lte: Math.round(proteinsN * procentFatalMax)},
   });
    const poldnik = await Food.find({ mealTime: "Полдник" });
   

    return res.json({ breakfast, obed, yzhin });

    
  } else {
    return res.redirect("/constructor");
  }
});













module.exports = router;
