const atecoPath = [
  "divisione",
  "gruppo",
  "classe",
  "categoria",
  "sottocategoria",
];

/* 
Reference for list of coeff by ateco: 
https://www.agenziaentrate.gov.it/portale/documents/20143/241208/allegato%2B4.pdf/d69be7fc-b18a-3c73-bd2e-b0f3c1970218 
*/
const getCoeff = (atecoCode) => {
  const [
    divisione,
    gruppoAndClasse,
    categoriaAndSottocategoria,
  ] = atecoCode.split(".");
  const [gruppo, classe] = gruppoAndClasse.split("");
  const [categoria, sottocategoria] = categoriaAndSottocategoria.split("");

  // Industrie alimentari e delle bevande
  if (["10", "11"].includes(divisione)) {
    return 40;
  }

  // Commercio all’ingrosso e al dettaglio
  if (
    divisione === "45" ||
    (divisione === "46" && Number(gruppo) >= 2 && Number(gruppo) <= 9) ||
    (divisione === "47" && Number(gruppo) >= 1 && Number(gruppo) <= 7) ||
    (divisione === "47" && gruppo === "9")
  ) {
    return 40;
  }

  // Commercio ambulante di prodotti alimentari e bevande
  if (divisione === "47" && gruppo === "8" && classe === "1") {
    return 40;
  }

  // Commercio ambulante di altri prodotti
  if (
    divisione === "47" &&
    Number(gruppo + classe) >= 82 &&
    Number(gruppo + classe) <= 89
  ) {
    return 54;
  }

  // Costruzioni e attività immobiliari
  if (
    divisione === "41" ||
    divisione === "42" ||
    divisione === "43" ||
    divisione === "68"
  ) {
    return 86;
  }

  // Intermediari del commercio
  if (divisione === "46" && gruppo === "1") {
    return 62;
  }

  // Attività dei servizi di alloggio e di ristorazione
  if (divisione === "55" || divisione === "56") {
    return 40;
  }
  // Attività professionali, scientifiche, tecniche, sanitarie, di istruzione, servizi finanziari e assicurativi
  if (
    (Number(divisione) >= 64 && Number(divisione) <= 66) ||
    (Number(divisione) >= 69 && Number(divisione) <= 75) ||
    (Number(divisione) >= 86 && Number(divisione) <= 88) ||
    divisione === "85"
  ) {
    return 78;
  }

  return 67;
};

const parseAtecoCodes = (list, prop, data = []) => {
  const arrayList = Array.isArray(list) ? list : [list];

  return arrayList.reduce((acc, el) => {
    const next = atecoPath.indexOf(prop) + 1;
    const hasProp = el[prop];
    const newData = [...data, el];

    if (!next || !hasProp) {
      return [...acc, newData];
    }

    return [...acc, ...parseAtecoCodes(el[prop], atecoPath[next], newData)];
  }, []);
};

const denormalize = (data) => {
  return data.map((path) => {
    const obj = path.reduce(
      (acc, step, i) => {
        const { [atecoPath[i]]: subStep, ...stepDetail } = step;
        const key = !i ? "sezione" : atecoPath[i - 1];
        const dot =
          acc.atecoCode.length &&
          !(acc.atecoCode.replaceAll(".", "").length % 2) &&
          !acc.atecoCode.endsWith(".")
            ? "."
            : "";

        return {
          ...acc,
          [key]: stepDetail,
          atecoCode: `${acc.atecoCode}${dot}${!i ? "" : step.codice}`,
        };
      },
      { atecoCode: "" }
    );

    return {
      ...obj,
      coeff: getCoeff(obj.atecoCode),
    };
  });
};

const getAtecoCodes = () =>
  fetch("../data/ateco.json").then(async (res) => {
    const { ateco } = await res.json();
    const multiArr = parseAtecoCodes(ateco.sezione, atecoPath[0]);
    return denormalize(multiArr);
  });

export default getAtecoCodes;
