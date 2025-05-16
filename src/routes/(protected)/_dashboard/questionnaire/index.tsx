import { createFileRoute } from "@tanstack/react-router";
import MultiStepForm from "./-components/multi-step-form";

const data = {
  questionnaire: [
    {
      step: 1,
      title: "Tu Yo Presente",
      questions: [
        {
          id: "present_important_people",
          prompt:
            "¿Quiénes son las personas que más impactan tu vida actual o futura cercana?",
          helper:
            "Incluye nombre y relación (ej. mi pareja Lucía, mi hijo Mateo)",
        },
        {
          id: "present_proud_moment",
          prompt:
            "Imagina que tu yo de 60 años quiere conocer lo que más te enorgullece. ¿Qué historia compartirías?",
          helper: "Describe una experiencia positiva y qué significó para ti",
        },
        {
          id: "present_difficult_moment",
          prompt: "¿Qué momento difícil de tu vida ha dejado una huella en ti?",
          helper: "Incluye lo que ocurrió, cómo lo viviste y qué aprendiste",
        },
        {
          id: "present_life_turning_point",
          prompt:
            "¿Hubo una decisión, evento o giro que cambió tu manera de ver la vida?",
          helper: "Un antes y después que reveló algo profundo sobre ti",
        },
      ],
    },
    {
      step: 2,
      title: "Tus Metas y Decisiones",
      questions: [
        {
          id: "goals_challenge",
          prompt: "¿Qué desafío te gustaría superar en tu camino de vida?",
          helper: "Algo que aún te cuesta o te inspira transformar",
        },
        {
          id: "goals_project",
          prompt:
            "¿Estás construyendo (o soñando con) un proyecto personal, creativo o profesional? ¿Cuál?",
          helper: "Explica por qué es importante para ti",
        },
        {
          id: "goals_career_vision",
          prompt:
            "¿Cómo visualizas tu carrera o actividad ideal en los próximos años?",
          helper:
            "Incluye el impacto que deseas tener y cómo te gustaría sentirte",
        },
        {
          id: "goals_decision_style",
          prompt: "¿Qué sueles priorizar al tomar decisiones importantes?",
          helper: "Ej. propósito, estabilidad, libertad, conexión, crecimiento",
        },
      ],
    },
    {
      step: 3,
      title: "Tu Yo del Futuro",
      questions: [
        {
          id: "future_residence",
          prompt:
            "¿Dónde imaginas vivir cuando tengas 60 años o más? ¿Y por qué allí?",
          helper: "Ciudad, naturaleza, país, cerca de alguien...",
        },
        {
          id: "future_daily_life",
          prompt: "¿Cómo sería un día ideal en tu vida a esa edad?",
          helper:
            "Desde que te levantas hasta que terminas el día: hábitos, actividades, entorno",
        },
        {
          id: "future_relationships",
          prompt:
            "¿Cómo te gustaría que fueran tus relaciones cercanas a esa edad?",
          helper: "Familia, pareja, amigos, comunidad",
        },
        {
          id: "future_advice_request",
          prompt:
            "Si tu Yo del Futuro pudiera darte un consejo ahora mismo, ¿sobre qué tema te gustaría que fuera?",
          helper:
            "Este deseo guiará las primeras conversaciones con tu “yo del futuro”",
        },
      ],
    },
  ],
};

export const Route = createFileRoute("/(protected)/_dashboard/questionnaire/")({
  component: QuestionnairePage,
});

function QuestionnairePage() {
  return <MultiStepForm data={data} />;
}
