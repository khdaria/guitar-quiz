import React, { useState, useEffect } from 'react';

const questions = [
  {
    text: "You're suddenly on stage — the crowd cheers. What do you do?",
    dimension: "ei",
    options: [
      { label: "Strike a pose and yell \"LET'S GO!\"", value: "E" },
      { label: "Quietly wonder if you’re dreaming...", value: "I" }
    ]
  },
  {
    text: "You’re offered the spotlight solo. You...",
    dimension: "ei",
    options: [
      { label: "Shred like it’s your destiny.", value: "E" },
      { label: "Point to the bassist and step back.", value: "I" }
    ]
  },
  {
    text: "The amp breaks. You...",
    dimension: "sn",
    options: [
      { label: "Check cables, toggle switches, troubleshoot.", value: "S" },
      { label: "Tap it, whisper 'revive thy tone spirit'.", value: "N" }
    ]
  },
  {
    text: "You hear a weird noise from your guitar. You...",
    dimension: "sn",
    options: [
      { label: "Identify the exact string and frequency.", value: "S" },
      { label: "Decide it’s an alien message and jam along.", value: "N" }
    ]
  },
  {
    text: "A bandmate forgets the chord progression. You...",
    dimension: "tf",
    options: [
      { label: "Stop the song and explain the chord logic.", value: "T" },
      { label: "Smile and improvise with them.", value: "F" }
    ]
  },
  {
    text: "Someone says your tone is 'weird'. You...",
    dimension: "tf",
    options: [
      { label: "Ask for a specific decibel range.", value: "T" },
      { label: "Cry a little, then thank them.", value: "F" }
    ]
  },
  {
    text: "The set starts in 10 minutes. You...",
    dimension: "jp",
    options: [
      { label: "Have a color-coded checklist ready.", value: "J" },
      { label: "Tune one string and wing the rest.", value: "P" }
    ]
  },
  {
    text: "Your cable is tangled. You...",
    dimension: "jp",
    options: [
      { label: "Wrap it properly, like a responsible adult.", value: "J" },
      { label: "Throw it in your case and pretend it’s fine.", value: "P" }
    ]
  }
];

const typeDescriptions = {
  INFJ: {
    title: "🌌 The Dreamy Songwriter",
    description: "Lives in a fog of reverb and feelings. Wears fingerless gloves for ~vibe~. Might be writing a concept album about trees."
  },
  INTJ: {
    title: "🧠 The Mastermind Shredder",
    description: "Built a solo using Fibonacci numbers. Wears shades indoors. Already wrote your part, too."
  },
  ISTJ: {
    title: "🎚️ The Gear Head",
    description: "Obsessed with perfect pedalboard symmetry. Labels their picks by day of the week. Probably owns more tuners than friends."
  },
  ISFJ: {
    title: "🤝 The Rhythm Rock",
    description: "Keeps time, peace, and snacks in check. Brings extra strings for the forgetful lead guitarist."
  },
  ISTP: {
    title: "🛠️ The Modder",
    description: "Turns a spoon into a slide mid-solo. Modded their amp to make toast."
  },
  ISFP: {
    title: "🎨 The Vibe Maestro",
    description: "Tunes by moonlight. Paints their guitars. Might cry if a string breaks... or if it doesn’t."
  },
  INFP: {
    title: "🌙 The Bedroom Poet",
    description: "Has 148 half-written love songs. Shares none of them. Legends say they once hit a high E and ascended."
  },
  INTP: {
    title: "🔬 The Tuning Hacker",
    description: "Uses math to justify chaos. Probably invented a new genre last Tuesday."
  },
  ESTP: {
    title: "🔥 The Stage Jumper",
    description: "Stage dives during acoustic sets. Broke 3 strings and the fourth wall."
  },
  ESFP: {
    title: "🎉 The Party Strummer",
    description: "Has glitter in their gig bag. Chords optional. Charisma maxed."
  },
  ENFP: {
    title: "🌈 The Genre Bender",
    description: "Today it’s country jazzcore. Tomorrow? Who knows. Definitely owns a kazoo."
  },
  ENTP: {
    title: "🎛️ The Sonic Explorer",
    description: "Every knob is turned to 11. Sounds like a spaceship. That’s the point."
  },
  ESTJ: {
    title: "📋 The Band Manager",
    description: "Micromanages tempo and snacks. Setlist printed in triplicate."
  },
  ESFJ: {
    title: "🎤 The Crowd Charmer",
    description: "Knows your name, your grandma’s name, and still hits the harmony like butter."
  },
  ENFJ: {
    title: "🪄 The Jam Leader",
    description: "Wrote everyone’s solos... just in case. Inspires tears and encores."
  },
  ENTJ: {
    title: "👑 The Guitar CEO",
    description: "Started a record label in their garage. Signed themselves and went platinum."
  }
};

const Quiz = () => {
  const [current, setCurrent] = useState(-1);
  const [answers, setAnswers] = useState({ ei: '', sn: '', tf: '', jp: '' });
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value, dimension) => {
    const updatedAnswers = { ...answers };
    updatedAnswers[dimension] += value;
    setAnswers(updatedAnswers);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const getMBTI = () => {
    return (
      (answers.ei.split('E').length >= answers.ei.split('I').length ? 'E' : 'I') +
      (answers.sn.split('S').length >= answers.sn.split('N').length ? 'S' : 'N') +
      (answers.tf.split('T').length >= answers.tf.split('F').length ? 'T' : 'F') +
      (answers.jp.split('J').length >= answers.jp.split('P').length ? 'J' : 'P')
    );
  };

  const mbtiResult = getMBTI();
  const resultData = typeDescriptions[mbtiResult];

  // 👇 SEND TO GOOGLE SHEETS HERE
  useEffect(() => {
    if (showResult) {
      fetch('https://script.google.com/macros/s/AKfycby2ZWxhZeRmVl7AL6C6-Pd5_1rWVKgpvK2xB4HNspt_l4trB5rDcYJfA5LEZxJKXsxfYg/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ei: answers.ei,
          sn: answers.sn,
          tf: answers.tf,
          jp: answers.jp,
          resultTitle: resultData.title
        })
      })
      .then(res => res.json())
    }
  }, [showResult]);
  
  

  return (
    <div className="container">
      {current === -1 ? (
        <div>
          <h1>You wake up on stage... the lights are blinding... the crowd is roaring...</h1>
          <p>Let’s find out what kind of guitarist you really are.</p>
          <button onClick={() => setCurrent(0)}>Begin your solo 🎸</button>
        </div>
      ) : !showResult ? (
        <div>
          <p>{questions[current].text}</p>
          <div>
            {questions[current].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option.value, questions[current].dimension)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2>You blink and find yourself back in your room...</h2>
          <h3>{resultData.title}</h3>
          <p>{resultData.description}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
