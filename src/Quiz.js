import React, { useState } from 'react';
import { questions } from './questions';

const typeDescriptions = {
  "The Artist": {
    title: "🎨 The Artist",
    description: "You’re not here to just play songs — you want to create. Whether it’s writing your own music or dreaming of being on stage, guitar is your way of saying something the world needs to hear. You’re driven by emotion and expression more than perfection. Technical drills might not excite you, but creating something original? That’s your fuel.\n\n🎯 Try exploring songwriting tools, open tunings, and emotion-driven practice — like improvising over mellow backing tracks."
  },
  "The Poser": {
    title: "😎 The Poser",
    description: "You picked up the guitar because it’s cool — and honestly, you’re not wrong. You want to learn fast, sound good enough to impress, and maybe drop a riff or two when the moment calls for it. You’re not looking to master theory; you want fun, fast wins, and a bit of flair. That’s totally legit.\n\n🎯 Focus on iconic intros, party riffs, and easy but flashy songs that make you look (and feel) like a star."
  },
  "The Eternal Restarter": {
    title: "🔁 The Eternal Restarter",
    description: "Hey — no shame. You’ve started learning more times than you can count, and every time you pick it back up, it’s because you still care. You want to play, but routines don’t stick, and it’s easy to feel like you’re starting from scratch again and again. That’s totally normal.\n\n🎯 Start with short, guided sessions and mix in something fun every few days to avoid burnout. Don’t aim for perfect — just keep moving."
  },
  "The Nerd": {
    title: "🧠 The Nerd",
    description: "You don’t just want to play guitar — you want to know everything about it. You dive deep into tone, gear, scales, and structure, and your brain lights up when things click. Theory excites you more than just memorizing chords. But sometimes you overthink it and forget to just play.\n\n🎯 Alternate focused practice with free exploration. Try theory-based challenges, scale workouts, and messing with gear or tone experiments."
  },
  "The I-Used-to-Play": {
    title: "🎸 The I-Used-to-Play",
    description: "You’ve been there. You used to play, maybe even jam or perform — but life moved on, and your guitar got a little dusty. The desire to play never fully left though, did it? That spark is still there, waiting.\n\n🎯 Ease back in with warm-ups, familiar songs, or genre packs that bring back that old joy. Skip the beginner stuff — go where it feels good."
  },
  "The Someday Player": {
    title: "⏰ The Someday Player",
    description: "You want to play — you really do. But between work, errands, and everything else, guitar ends up last on the list. Still, every time you touch it, it’s like a breath of fresh air. You’re not lacking motivation — you’re just lacking time.\n\n🎯 Stick to 5–10 minute sessions. Try “riff of the day” or short, rewarding exercises that don’t need a warm-up or mental prep."
  },
  "The Teacher’s Pet": {
    title: "🏅 The Teacher’s Pet",
    description: "You love ticking boxes, smashing goals, and watching your progress add up. You’re the kind of learner who wants a clear path, feedback, and reasons to say “nailed it.” You thrive on structure — and maybe just a little competition.\n\n🎯 Focus on goal-based lesson paths, streak challenges, and skill-tracking tools. Bonus points if there’s a badge at the end."
  },
  "The Hobby Hopper": {
    title: "🎯 The Hobby Hopper",
    description: "Guitar is fun! So was painting, yoga, and maybe roller skating. You love diving into new interests — and sometimes you bounce out just as fast. No worries. As long as guitar stays exciting, you’ll keep coming back.\n\n🎯 Skip the grind — go for fun riffs, quick wins, and try different genres often. Keep it fresh, light, and low-pressure."
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
          <p>We all have a guitarist inside us. Some just haven’t plugged in yet.<br/>Pick what feels most <em>you</em> — no playing experience needed.</p>
          <button onClick={() => setCurrent(0)}>Reveal my type ✨</button>
        </div>
      ) : !showResult ? (
        <div className="question-screen">
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
          <h3>{resultData.title}</h3>
          <p>{resultData.description}</p>

          <h4>🧠 Your full guitar type breakdown:</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {[...Object.entries(scores)]
              .filter(([_, count]) => count > 0)
              .map(([type, count]) => {
                const percentage = Math.round((count / totalAnswers) * 100);
                return { type, percentage };
              })
              .sort((a, b) => b.percentage - a.percentage)
              .map(({ type, percentage }) => (
                <li key={type}><strong>{type}</strong>: {percentage}%</li>
              ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Quiz;
