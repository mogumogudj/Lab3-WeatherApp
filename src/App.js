export default class App {
    constructor() {
        console.log('Constructed!');
        this.getLocation();
        this.setupBirdSoundButton();
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition(
            this.showPosition.bind(this),
            this.showError()
        );
    }

    showPosition(position) {
        console.log(position);
        let x = position.coords.latitude;
        let y = position.coords.longitude;
        this.getWeather(x, y);
    }

    updateWeatherIcon(temperature) {
        const weatherIcon = document.querySelector(".weather-icon");
    
        if (temperature < 5) {
          weatherIcon.className = "fas fa-snowflake"; // Snowflake icon
        } else if (temperature < 12) {
          weatherIcon.className = "fas fa-snowflake"; // Cold icon
        } else if (temperature < 20) {
          weatherIcon.className = "fas fa-cloud"; // Cloud icon
        } else {
          weatherIcon.className = "fas fa-sun"; // Sun icon
        }
      }

    getWeather(x, y) {
        //api key url to ask for all data needed with x and y coordinates
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${x}&longitude=${y}&hourly=temperature_2m&current_weather=true&forecast_days=1`)
            .then(response => response.json())
            .then(data => {
                const temp = data.current_weather.temperature;
                document.querySelector("h2").innerHTML = temp + "°C";

                this.updateWeatherIcon(temp);
            }
            
            )



            
            .catch(error => console.log(error));
    }

    showError(error) {
        console.log(error);
    }


// fetch and play a random bird sound from Brazil
  playRandomBirdSound() {
    // make a request to the Xeno-Canto API to get a list of recordings from Brazil
    fetch("https://xeno-canto.org/api/2/recordings?query=cnt:brazil&page=5")
      .then(response => response.json())
      .then(data => {

        const randomIndex = Math.floor(Math.random() * data.recordings.length);
        const randomRecording = data.recordings[randomIndex];

        const audioUrl = randomRecording.file;

        const audio = new Audio(audioUrl);
        audio.play();
      })
      .catch(error => console.log(error));
  }

  setupBirdSoundButton() {
    const playButton = document.getElementById("play-bird-sound");
    playButton.addEventListener("click", () => {
      this.playRandomBirdSound();
    });
  }

}