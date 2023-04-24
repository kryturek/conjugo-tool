import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const ConjugationMatch = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState('');
  const [questions] = useState([
	  {
		  infinitive: "hablar",
		  present: "hablo",
		  past: "hablé",
		  future: "hablaré"
		},
		{
			infinitive: "comer",
			present: "como",
			past: "comí",
			future: "comeré"
		},
		{
			infinitive: "vivir",
			present: "vivo",
			past: "viví",
			future: "viviré"
		},
		// more questions
	]);
	const tenseOptions = ['present', 'past', 'future'];
	
	const getRandomTense = () => {
		return tenseOptions[Math.floor(Math.random() * tenseOptions.length)];
	};
	const [tense, setTense] = useState(getRandomTense());
	
	const checkAnswer = (selectedAnswer, selectedTense) => {
		if(selectedAnswer === questions[currentQuestion][selectedTense]) {
			setScore(score + 1);
		}
		setCurrentQuestion(Math.floor(Math.random() * questions.length));
		setShowAnswer(false);
		setAnswer('');
    setTense(getRandomTense());
  };

  const renderTense = () => {
    return (
      <Text style={styles.tenseText}>
        Conjugate into: {tense}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.infinitiveText}>
        {questions[currentQuestion].infinitive}
      </Text>
      {renderTense()}
      <View style={styles.answerContainer}>
        <TextInput
          style={styles.answerBox}
          placeholder="Type your answer here"
          onChangeText={(text) => {
            setAnswer(text);
          }}
          value={answer}
        />
        <TouchableOpacity style={styles.button} onPress={() => checkAnswer(answer, tense)}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.scoreText}>Your score: {score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  infinitiveText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tenseText: {
    fontSize: 24,
    marginBottom: 16,
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  answerBox: {
    height: 40,
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 32,
  },
});

export default ConjugationMatch;
