const introScreens = [
  {
    eyebrow: "ลูกเจี๊ยบคุง",
    title: "เช็กใจก่อนลงสตอรี่",
    copy:
      "วันนี้มีเพื่อนตัวเล็กชื่อ “ลูกเจี๊ยบคุง” อยากชวนคุณเดินผ่าน 9 ฉากสั้น ๆ เพื่อดูแลใจตัวเองแบบนุ่มนวล",
  },
  {
    eyebrow: "ช่วง 2 สัปดาห์ที่ผ่านมา",
    title: "ตอบตามความรู้สึกจริง",
    copy:
      "ไม่มีคำตอบที่ดีหรือแย่ มีแค่สัญญาณที่ช่วยให้เราเห็นใจตัวเองชัดขึ้น เลือกระดับความถี่ในแต่ละข้อได้เลย",
  },
];

const questions = [
  "ไม่ค่อยสนใจหรือเพลิดเพลินกับการทำสิ่งต่าง ๆ",
  "รู้สึกเศร้า หดหู่ หรือสิ้นหวัง",
  "นอนหลับยาก หลับไม่สนิท หรือหลับมากเกินไป",
  "รู้สึกเหนื่อยง่าย หรือไม่มีแรง",
  "เบื่ออาหาร หรือกินมากเกินไป",
  "รู้สึกไม่ดีกับตัวเอง รู้สึกล้มเหลว หรือทำให้ตนเอง/ครอบครัวผิดหวัง",
  "มีปัญหาในการจดจ่อ เช่น อ่านหนังสือ ดูทีวี หรือทำงาน",
  "เคลื่อนไหวหรือพูดช้าจนคนอื่นสังเกตได้ หรือกระสับกระส่ายมากกว่าปกติ",
  "คิดว่าถ้าตายไปคงดี หรือคิดทำร้ายตัวเองด้วยวิธีใดวิธีหนึ่ง",
];

const choices = [
  { label: "ไม่มีเลย", value: 0 },
  { label: "เป็นบางวัน", value: 1 },
  { label: "เป็นบ่อย", value: 2 },
  { label: "เกือบทุกวัน", value: 3 },
];

const resultBands = [
  {
    min: 0,
    max: 4,
    scene: "result-calm",
    title: "สัญญาณเบา ๆ",
    label: "อาการน้อยมาก",
    copy: "คะแนนอยู่ในช่วงต่ำ ลองรักษาจังหวะพักผ่อน การกิน และคนที่ทำให้ใจรู้สึกปลอดภัยไว้ใกล้ ๆ",
  },
  {
    min: 5,
    max: 9,
    scene: "result-care",
    title: "เริ่มต้องดูแลใจ",
    label: "อาการน้อย",
    copy: "มีสัญญาณบางอย่างที่ควรรับฟัง ลองคุยกับคนไว้ใจและจัดพื้นที่พักให้ตัวเองมากขึ้น",
  },
  {
    min: 10,
    max: 14,
    scene: "result-support",
    title: "ควรขอแรงสนับสนุน",
    label: "อาการปานกลาง",
    copy: "คะแนนอยู่ในช่วงปานกลาง การคุยกับผู้เชี่ยวชาญหรือบริการให้คำปรึกษาอาจช่วยให้เบาขึ้น",
  },
  {
    min: 15,
    max: 19,
    scene: "result-reach",
    title: "อย่าอยู่กับมันคนเดียว",
    label: "อาการค่อนข้างรุนแรง",
    copy: "สัญญาณค่อนข้างมาก ควรติดต่อผู้เชี่ยวชาญ คนใกล้ตัว หรือหน่วยบริการสุขภาพจิตโดยเร็ว",
  },
  {
    min: 20,
    max: 27,
    scene: "result-urgent",
    title: "ขอความช่วยเหลือทันที",
    label: "อาการรุนแรง",
    copy: "คะแนนสูงมาก โปรดติดต่อผู้เชี่ยวชาญหรือคนที่ไว้ใจทันที หากไม่ปลอดภัยให้ติดต่อบริการฉุกเฉินในพื้นที่",
  },
];

const sceneClasses = [
  "intro-welcome",
  "intro-honest",
  "q-interest",
  "q-sad",
  "q-sleep",
  "q-energy",
  "q-appetite",
  "q-self",
  "q-focus",
  "q-motion",
  "q-safety",
  "result-calm",
  "result-care",
  "result-support",
  "result-reach",
  "result-urgent",
];

const questionScenes = sceneClasses.slice(2, 11);

let step = 0;
const answers = Array(questions.length).fill(null);

const progressTrack = document.querySelector("#progressTrack");
const screenEyebrow = document.querySelector("#screenEyebrow");
const screenTitle = document.querySelector("#screenTitle");
const storyCopy = document.querySelector("#storyCopy");
const quizArea = document.querySelector("#quizArea");
const questionText = document.querySelector("#questionText");
const choicesNode = document.querySelector("#choices");
const resultArea = document.querySelector("#resultArea");
const scoreText = document.querySelector("#scoreText");
const resultTitle = document.querySelector("#resultTitle");
const resultCopy = document.querySelector("#resultCopy");
const scoreScale = document.querySelector("#scoreScale");
const shareScore = document.querySelector("#shareScore");
const shareLabel = document.querySelector("#shareLabel");
const backButton = document.querySelector("#backButton");
const nextButton = document.querySelector("#nextButton");
const resetButton = document.querySelector("#resetButton");
const downloadButton = document.querySelector("#downloadButton");
const copyButton = document.querySelector("#copyButton");
const storyCard = document.querySelector("#storyCard");
const character = document.querySelector("#character");
const scene = document.querySelector("#scene");
const sharePreview = document.querySelector("#sharePreview");

const totalSteps = introScreens.length + questions.length + 1;

function applyScene(sceneName, score = 0) {
  const mood = Math.min(1, score / 27);
  storyCard.classList.remove(...sceneClasses);
  scene.classList.remove(...sceneClasses);
  character.classList.remove(...sceneClasses);
  sharePreview.classList.remove(...sceneClasses);
  storyCard.classList.add(sceneName);
  scene.classList.add(sceneName);
  character.classList.add(sceneName);
  sharePreview.classList.add(sceneName);
  character.style.filter = `saturate(${1 - mood * 0.28})`;
  character.style.opacity = `${1 - mood * 0.08}`;
}

function renderProgress() {
  progressTrack.innerHTML = "";
  for (let index = 0; index < totalSteps; index += 1) {
    const bar = document.createElement("span");
    if (index <= step) bar.classList.add("active");
    progressTrack.appendChild(bar);
  }
}

function getScore() {
  return answers.reduce((sum, answer) => sum + (answer ?? 0), 0);
}

function getBand(score) {
  return resultBands.find((band) => score >= band.min && score <= band.max);
}

function renderScoreScale(score) {
  scoreScale.innerHTML = "";
  const heading = document.createElement("p");
  heading.className = "scale-heading";
  heading.textContent = "ช่วงคะแนน PHQ-9";
  scoreScale.appendChild(heading);

  resultBands.forEach((band) => {
    const row = document.createElement("div");
    row.className = "scale-row";
    if (score >= band.min && score <= band.max) row.classList.add("active");
    row.innerHTML = `<span>${band.min}-${band.max}</span><strong>${band.label}</strong>`;
    scoreScale.appendChild(row);
  });
}

function renderIntro() {
  const current = introScreens[step];
  screenEyebrow.textContent = current.eyebrow;
  screenTitle.textContent = current.title;
  storyCopy.textContent = current.copy;
  storyCopy.hidden = false;
  quizArea.hidden = true;
  resultArea.hidden = true;
  nextButton.textContent = step === 0 ? "เริ่มเดินทาง" : "ไปข้อแรก";
  nextButton.disabled = false;
  downloadButton.disabled = true;
  copyButton.disabled = true;
  applyScene(step === 0 ? "intro-welcome" : "intro-honest", 0);
}

function renderQuestion() {
  const questionIndex = step - introScreens.length;
  screenEyebrow.textContent = `ข้อ ${questionIndex + 1} / ${questions.length}`;
  screenTitle.textContent = "ในช่วง 2 สัปดาห์ที่ผ่านมา";
  storyCopy.hidden = true;
  quizArea.hidden = false;
  resultArea.hidden = true;
  questionText.textContent = questions[questionIndex];
  choicesNode.innerHTML = "";

  choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    if (answers[questionIndex] === choice.value) button.classList.add("selected");
    button.innerHTML = `<span>${choice.label}</span><span>${choice.value}</span>`;
    button.addEventListener("click", () => {
      answers[questionIndex] = choice.value;
      render();
    });
    choicesNode.appendChild(button);
  });

  nextButton.textContent = questionIndex === questions.length - 1 ? "ดูผลลัพธ์" : "ถัดไป";
  nextButton.disabled = answers[questionIndex] === null;
  downloadButton.disabled = true;
  copyButton.disabled = true;
  applyScene(questionScenes[questionIndex], getScore());
}

function renderResult() {
  const score = getScore();
  const band = getBand(score);
  screenEyebrow.textContent = "ผลลัพธ์ของคุณ";
  screenTitle.textContent = "การ์ดพร้อมแชร์";
  storyCopy.hidden = true;
  quizArea.hidden = true;
  resultArea.hidden = false;
  scoreText.textContent = `คะแนน PHQ-9: ${score} / 27`;
  resultTitle.textContent = band.title;
  resultCopy.textContent = band.copy;
  renderScoreScale(score);
  shareScore.textContent = `PHQ-9: ${score} / 27`;
  shareLabel.textContent = band.title;
  nextButton.textContent = "เริ่มใหม่";
  nextButton.disabled = false;
  downloadButton.disabled = false;
  copyButton.disabled = false;
  applyScene(band.scene, score);
}

function render() {
  renderProgress();
  backButton.disabled = step === 0;
  if (step < introScreens.length) {
    renderIntro();
  } else if (step < introScreens.length + questions.length) {
    renderQuestion();
  } else {
    renderResult();
  }
}

function reset() {
  step = 0;
  answers.fill(null);
  render();
}

backButton.addEventListener("click", () => {
  if (step > 0) {
    step -= 1;
    render();
  }
});

nextButton.addEventListener("click", () => {
  if (step === totalSteps - 1) {
    reset();
    return;
  }
  step += 1;
  render();
});

resetButton.addEventListener("click", reset);

downloadButton.addEventListener("click", async () => {
  if (!window.html2canvas) return;
  const canvas = await window.html2canvas(storyCard, {
    backgroundColor: null,
    scale: 2,
  });
  const link = document.createElement("a");
  link.download = "mood-journey-phq9-story.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

copyButton.addEventListener("click", async () => {
  const score = getScore();
  const band = getBand(score);
  const text = `ลูกเจี๊ยบคุง PHQ-9: ${score}/27 - ${band.title}`;
  await navigator.clipboard.writeText(text);
  copyButton.textContent = "คัดลอกแล้ว";
  setTimeout(() => {
    copyButton.textContent = "คัดลอกข้อความ";
  }, 1600);
});

render();
