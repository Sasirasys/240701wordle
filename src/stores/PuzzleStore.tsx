import words from '../words.json'

export default {
    word: '',
    guesses: Array(),
    currentGuess: 0,
    get won() {
        return this.guesses[this.currentGuess -1] === this.word
    },
    get lost() {
        return this.currentGuess === 6 && !(this.won)
    },
    get allGuesses() {
        return this.guesses.slice(0, this.currentGuess).join('').split('')
    },
    get exactGuesses() {
        return (
            this.word
                .split('')
                // if any guesses include this letter in this position/index
                .filter((letter, i) => {
                    return this.guesses
                        .slice(0, this.currentGuess)
                        .map(word => word[i])
                        .includes(letter)
                })
        )
    },
    get inexactGuesses() {
        return this.word
            .split('')
            .filter(letter => this.allGuesses.includes(letter))
    },
    init() {
        this.word = words[Math.round(Math.random() * words.length)]
        this.guesses=(new Array(6).fill(''))
        this.currentGuess = 0
    },
    submitGuess() {
        if (words.includes(this.guesses[this.currentGuess])) {
            this.currentGuess += 1
        }
    },
    handleKeyup(e: { key: string }) {
        if (this.won || this.lost) {
            return
        }
        if (e.key === "Enter") {
            return this.submitGuess()
        }
        if (e.key === "Backspace") {
            this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(
                0,
                this.guesses[this.currentGuess].length -1
            )
        }
        if (this.guesses[this.currentGuess].length < 5 && e.key.match(/^[A-z]$/)) {
            this.guesses[this.currentGuess] = 
                this.guesses[this.currentGuess] + e.key.toLowerCase()
        }
    },
    handleButton(e: {char: string}) {
        //console.log(e.char);
        if (this.won || this.lost) {
            return
        }
        if (e.char === "↵ Enter") {
            return this.submitGuess()
        }
        if (e.char === "< Backspace") {
            this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(
                0,
                this.guesses[this.currentGuess].length -1
            )
        }
        if (this.guesses[this.currentGuess].length < 5 && e.char.match(/^[A-z]$/)) {
            this.guesses[this.currentGuess] = 
                this.guesses[this.currentGuess] + e.char.toLowerCase()
        }
    }
}