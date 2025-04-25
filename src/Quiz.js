import React, { useState } from 'react';
import { questions } from './questions';

const typeImages = {
  "The Artist": "/img/artist.png",
  "The Poser": "/img/poser.png",
  "The Eternal Restarter": "/img/restarter.png",
  "The Nerd": "/img/nerd.png",
  "The I-Used-to-Play": "/img/usedtoplay.png",
  "The Someday Player": "/img/someday.png",
  "The Practice Machine": "/img/teacher.png",
  "The Hobby Hopper": "/img/hopper.png"
};

const typeDescriptions = {
  "The Artist": {
    short: "Emotional stage dreamer",
    title: "The Artist",
    description1: "You’re not here to just play songs — you want to create. Whether it’s writing your own music or dreaming of being on stage, guitar is your way of saying something the world needs to hear. You’re driven by emotion and expression more than perfection.",
    description2: "Try exploring songwriting tools, open tunings, and emotion-driven practice — like improvising over mellow backing tracks."
  },
  "The Poser": {
    short: "Stylish riff dropper",
    title: "The Poser",
    description1: "You picked up the guitar because it’s cool — and honestly, you’re not wrong. You want to learn fast, sound good enough to impress, and maybe drop a riff or two when the moment calls for it.",
    description2: "Focus on iconic intros, party riffs, and easy but flashy songs that make you look (and feel) like a star."
  },
  "The Eternal Restarter": {
    short: "Hopeful chaos repeater",
    title: "The Eternal Restarter",
    description1: "Hey — no shame. You’ve started learning more times than you can count, and every time you pick it back up, it’s because you still care.",
    description2: "Start with short, guided sessions and mix in something fun every few days to avoid burnout. Don’t aim for perfect — just keep moving."
  },
  "The Nerd": {
    short: "Theory-loving tinkerer",
    title: "The Nerd",
    description1: "You don’t just want to play guitar — you want to know everything about it. You dive deep into tone, gear, scales, and structure, and your brain lights up when things click.",
    description2: "🎯 Alternate focused practice with free exploration. Try theory-based challenges, scale workouts, and gear experiments."
  },
  "The I-Used-to-Play": {
    short: "Rusty but nostalgic",
    title: "The I-Used-to-Play",
    description1: "You’ve been there. You used to play, maybe even jam or perform — but life moved on, and your guitar got a little dusty.",
    description2: "Ease back in with warm-ups, familiar songs, or genre packs that bring back that old joy."
  },
  "The Someday Player": {
    short: "Busy with good intentions",
    title: "The Someday Player",
    description1: "You want to play — you really do. But between work, errands, and everything else, guitar ends up last on the list.",
    description2: "Stick to 5–10 minute sessions. Try “riff of the day” or short, rewarding exercises that don’t need warm-up."
  },
  "The Practice Machine": {
    short: "Badge-seeking overachiever",
    title: "The Practice Machine",
    description1: "You love ticking boxes, smashing goals, and watching your progress add up. You want a clear path and feedback.",
    description2: "Focus on lesson paths, streak challenges, and skill-tracking tools. Bonus if there’s a badge at the end."
  },
  "The Hobby Hopper": {
    short: "Genre-skipping enthusiast",
    title: "The Hobby Hopper",
    description1: "Guitar is fun! So was painting, yoga, and maybe roller skating. You love diving into new interests.",
    description2: "Go for fun riffs, quick wins, and try different genres often. Keep it fresh and light."
  }
};

const Quiz = () => {
  const [current, setCurrent] = useState(-1);
  const [scores, setScores] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (type) => {
    setScores((prev) => ({
      ...prev,
      [type]: (prev[type] || 0) + 1
    }));

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const getTopType = () => {
    const entries = Object.entries(scores);
    if (entries.length === 0) return null;
    const sorted = entries.sort((a, b) => b[1] - a[1]);
    return sorted[0][0];
  };

  const topType = getTopType();
  const resultData = topType ? typeDescriptions[topType] : null;
  const totalAnswers = Object.values(scores).reduce((sum, val) => sum + val, 0);

  return (
    <div className="quiz-container">
      {current === -1 ? (
        <div className="intro-screen">
          <img src="/img/guitar-stage.png" alt="Stage" className="intro-image" />
          <h1>Discover Your Guitar Persona</h1>
          <p>
            We all have a guitarist inside us. Some just haven’t plugged in yet.<br />
            Pick what feels most <em>you</em> — no playing experience needed.
          </p>
          <button onClick={() => setCurrent(0)}>Reveal my type ✨</button>
        </div>
      ) : !showResult ? (
        <div className="question-screen">
          <div className="progress-bar-wrapper">
            <div
              className="progress-bar"
              style={{ width: `${Math.round(((current + 1) / questions.length) * 100)}%` }}
            ></div>
          </div>
          <p>{questions[current].text}</p>
          <div className="options">
            {questions[current].options.map((option, idx) => (
              <div key={idx} className="option-wrapper">
                <button
                  className="answer-button"
                  onClick={() => handleAnswer(option.type)}
                >
                  {option.label}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : resultData ? (
        <div className="result-screen">
          <h2>Your Guitar Player Type</h2>
          <img src={typeImages[topType]}  alt={topType} className="result-image"/>
          <h2>{resultData.title}</h2>
          <div className="result-description">
            <p>{resultData.description1}</p>
            <p>{resultData.description2}</p>
          </div>
          <h4>Your full guitar type breakdown:</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {[...Object.entries(scores)]
              .filter(([type, count]) => count > 0 && type !== topType)
              .map(([type, count]) => {
                const percentage = Math.round((count / totalAnswers) * 100);
                return { type, percentage };
              })
              .sort((a, b) => b.percentage - a.percentage)
              .map(({ type, percentage }) => (
                <li key={type}><strong>{type}</strong> — {typeDescriptions[type].short}: {percentage}%</li>
              ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Quiz;
