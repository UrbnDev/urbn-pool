import imgSrc from "../../assets/img/artwork.jpg";
import imgSrc2 from "../../assets/img/artwork2.jpg";
import imgSrc3 from "../../assets/img/artwork3.jpg";
import cali from "../../assets/img/cali-wataboi.mp3";
import fifty from "../../assets/img/50-tobylane.mp3";
import iwonder from "../../assets/img/iwonder-dreamheaven.mp3";

// All of these artists are at https://pixabay.com/music/search/mood/laid%20back/
export default [
  {
    title: "Cali",
    artist: "Wataboi",
    audioSrc: cali,
    image: imgSrc,
    color: "#00aeb0"
  },
  {
    title: "50",
    artist: "tobylane",
    audioSrc: fifty,
    image: imgSrc2,
    color: "#ffb77a"
  },
  {
    title: "I Wonder",
    artist: "DreamHeaven",
    audioSrc: iwonder,
    image: imgSrc3,
    color: "#5f9fff"
  }
];
