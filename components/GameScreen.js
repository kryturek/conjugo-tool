import React, { useState, useEffect } from "react";
import {
	Text,
	TextInput,
	Button,
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
} from "react-native";
import SpanishConjugator from "spanishconjugator";
import { clean } from "diacritic";

const verbs = ["hablar", "comer", "vivir"];

const getRandomVerb = () => {
	const randomIndex = Math.floor(Math.random() * verbs.length);
	return verbs[randomIndex];
};

const getRandomMood = () => {
	const randomIndex = Math.floor(Math.random() * moods.length);
	return moods[randomIndex];
};

const getRandomMoodAndTense = () => {
	const tenses = [
		{
			"mood": "indicative",
			"tense": "present"
		 },
		 {
			"mood": "indicative",
			"tense": "imperfect"
		 },
		 {
			"mood": "indicative",
			"tense": "preterite"
		 },
		 {
			"mood": "indicative",
			"tense": "future"
		 },
		 {
			"mood": "indicative",
			"tense": "present_perfect"
		 },
		 {
			"mood": "indicative",
			"tense": "past_perfect"
		 },
		 {
			"mood": "indicative",
			"tense": "past_anterior"
		 },
		 {
			"mood": "indicative",
			"tense": "future_perfect"
		 },
		 {
			"mood": "conditional",
			"tense": "simple_conditional"
		 },
		 {
			"mood": "conditional",
			"tense": "perfect"
		 },
		 {
			"mood": "imperitive",
			"tense": "affirmative"
		 },
		 {
			"mood": "imperative",
			"tense": "negative"
		 },
		 {
			"mood": "subjunctive",
			"tense": "present"
		 },
		 {
			"mood": "subjunctive",
			"tense": "present_perfect"
		 },
		 {
			"mood": "subjunctive",
			"tense": "pluperfect"
		 },
		//  {
		// 	"mood": "subjunctive",
		// 	"tense": "future_perfect"
		//  },
		 {
			"mood": "subjunctive",
			"tense": "imperfect"
		 },
		 {
			"mood": "subjunctive",
			"tense": "imperfect_se"
		 },
		 {
			"mood": "subjunctive",
			"tense": "future"
		 }
	]
	const randomIndex = Math.floor(Math.random() * tenses.length);
	return tenses[randomIndex];
};

const getRandomPerformer = () => {
	const performers = ["yo", "tu", "usted", "nosotros", "vosotros", "ustedes"];
	const randomIndex = Math.floor(Math.random() * performers.length);
	return performers[randomIndex];
};

const GameScreen = () => {
	const [infinitive, setInfinitive] = useState("");
	const [mood, setMood] = useState("");
	const [performer, setPerformer] = useState("");
	const [tense, setTense] = useState("");
	const [answer, setAnswer] = useState("");
	const [feedback, setFeedback] = useState("");
	const [count, setCount] = useState(0);
	const [highestCount, setHighestCount] = useState(0);

	useEffect(() => {
		const newInfinitive = getRandomVerb();
		const newMoodAndTense = getRandomMoodAndTense();
		const newMood = newMoodAndTense.mood;
		const newTense = newMoodAndTense.tense;
		const newPerformer = getRandomPerformer();
		setMood(newMood);
		setInfinitive(newInfinitive);
		setTense(newTense);
		setPerformer(newPerformer);
		setAnswer("");
		setFeedback("");
		setCount(0);
	}, []);

	const handleSubmit = () => {
		const correctAnswer = SpanishConjugator.SpanishConjugator(
			infinitive,
			tense,
			mood,
			performer
		);
		const normalisedUserAnswer = answer.toLowerCase().trim();
		const normalisedCorrectAnswer = correctAnswer.toLowerCase();
		if (normalisedUserAnswer === normalisedCorrectAnswer) {
			setFeedback(`${answer.trim()} is correct!`);
		} else if(clean(normalisedUserAnswer) === clean(normalisedCorrectAnswer)){
			setFeedback(`Almost correct. The correct answer is ${normalisedCorrectAnswer}, you wrote ${normalisedUserAnswer}.`)
		} else {
			setFeedback(`Incorrect. The correct answer is ${correctAnswer}.`);
		}

		const newInfinitive = getRandomVerb();
		const newPerformer = getRandomPerformer();
		const newMoodAndTense = getRandomMoodAndTense();
		const newMood = newMoodAndTense.mood;
		const newTense = newMoodAndTense.tense;
		setMood(newMood);
		setInfinitive(newInfinitive);
		setTense(newTense);
		setPerformer(newPerformer);
		setAnswer("");

	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<Text style={styles.infinitive}>{infinitive}</Text>
				<Text style={styles.mood_tense}>{mood} / {tense.replace(/_/g, ' ')}</Text>
				<Text style={styles.performer}>{performer}</Text>
				<TextInput
					style={styles.userInput}
					onChangeText={setAnswer}
					value={answer}
				/>
				<Button onPress={handleSubmit} title="Submit" color="#841584" />
				<Text style={styles.feedback}>{feedback}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 80,
	},
	infinitive: {
		backgroundColor: "#39393a",
		color: '#e6e6e6',
		padding: 30,
		fontSize: 46,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: 'center'
	},
	mood_tense: { fontSize: 20, marginBottom: 20, textAlign: 'center' },
	
	performer: { fontSize: 20, marginBottom: 20, textAlign: 'center' },
	userInput: {
		height: 50,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 20,
		fontSize: 36,
		textAlign: 'center',
	},
	submit: {},
	feedback: { marginTop: 20, color: "green", textAlign: 'center' },
});

export default GameScreen;
