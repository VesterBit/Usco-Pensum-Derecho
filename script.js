// Mapeo de prerrequisitos
const prerequisitos = {
  "ddhh": ["introduccion-derecho"],
  "civil-personas": ["historia-derecho"],
  "constitucional-general": ["teoria-estado"],
  "sociologia-juridica": ["sociologia"],
  "comercial-general": ["historia-derecho"],
  "economia-colombiana": ["economia-politica"],

  "constitucional-colombiano": ["constitucional-general"],
  "bienes": ["civil-personas"],
  "dip-dipri": ["ddhh"],
  "negocio-juridico": ["civil-personas"],

  "obligaciones": ["bienes", "negocio-juridico"],
  "seminario-i": ["investigacion"],
  "penal-general": ["ddhh"],
  "administrativo-general": ["constitucional-colombiano"],
  "sociedades": ["comercial-general", "negocio-juridico"],
  "familia": ["civil-personas"],

  "administrativo-colombiano": ["administrativo-general"],
  "teoria-proceso": ["obligaciones"],
  "penal-especial-i": ["penal-general"],
  "laboral-individual": ["ddhh"],
  "contratos": ["obligaciones", "sociedades"],
  "seminario-ii": ["seminario-i"],

  "procesal-civil": ["teoria-proceso"],
  "penal-especial-ii": ["penal-especial-i"],
  "titulos-valores": ["contratos"],
  "laboral-colectivo": ["laboral-individual"],
  "procesal-constitucional": ["constitucional-colombiano"],

  "procesal-administrativo": ["administrativo-colombiano"],
  "responsabilidad": ["administrativo-colombiano", "contratos"],
  "procesal-laboral": ["laboral-individual"],
  "procesal-penal": ["penal-especial-ii"],
  "consultorio-i": ["procesal-civil"],

  "mecanismos-conflictos": ["procesal-civil"],
  "derecho-probatorio": ["procesal-civil", "procesal-penal", "procesal-administrativo", "procesal-laboral", "procesal-constitucional"],
  "sucesiones": ["familia"],
  "consultorio-ii": ["responsabilidad", "consultorio-i"],

  "seguridad-social": ["administrativo-colombiano", "laboral-individual"],
  "consultorio-iii": ["consultorio-ii"],
  "conciliacion-i": ["mecanismos-conflictos"],

  "consultorio-iv": ["consultorio-iii"],
  "conciliacion-ii": ["consultorio-iii"]
};

// Cargar estado desde localStorage
const completadas = new Set(JSON.parse(localStorage.getItem("completadas") || "[]"));

document.addEventListener("DOMContentLoaded", () => {
  // Aplicar estilo y lógica inicial
  document.querySelectorAll(".materia").forEach(materia => {
    const id = materia.id;

    // Aplicar clases completadas
    if (completadas.has(id)) {
      materia.classList.add("completada");
    }

    // Verificar si puede estar habilitada
    if (puedeDesbloquearse(id)) {
      materia.classList.add("resaltada");
    } else if (!completadas.has(id)) {
      materia.classList.add("bloqueada");
      materia.style.pointerEvents = "none"; // desactiva el click si no se puede desbloquear aún
      materia.style.opacity = "0.5";
    }
  });
});

function puedeDesbloquearse(id) {
  const requisitos = prerequisitos[id] || [];
  return requisitos.every(req => completadas.has(req));
}

function toggleMateria(id) {
  const el = document.getElementById(id);

  if (completadas.has(id)) {
    completadas.delete(id);
    el.classList.remove("completada");
  } else {
    completadas.add(id);
    el.classList.add("completada");
  }

  localStorage.setItem("completadas", JSON.stringify([...completadas]));
  actualizarDesbloqueos();
}

function actualizarDesbloqueos() {
  document.querySelectorAll(".materia").forEach(materia => {
    const id = materia.id;

    if (completadas.has(id)) {
      materia.classList.add("completada");
      materia.classList.remove("resaltada");
      materia.style.pointerEvents = "auto";
      materia.style.opacity = "1";
    } else {
      if (puedeDesbloquearse(id)) {
        materia.classList.add("resaltada");
        materia.style.pointerEvents = "auto";
        materia.style.opacity = "1";
      } else {
        materia.classList.remove("resaltada");
        materia.style.pointerEvents = "none";
        materia.style.opacity = "0.5";
      }

      materia.classList.remove("completada");
    }
  });
}
