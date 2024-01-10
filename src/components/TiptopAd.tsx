import { Image } from "astro:assets";
import henloIcon from "../images/henlo-icon.png";
import peatIcon from "../images/peat-icon.png";
import stoinsIcon from "../images/stoins-icon.png";
import appStoreIcon from "../images/app-store.svg";
import styles from "../css/TiptopAd.module.css";

export default function TiptopAd() {
  const apps = [
    {
      title: "Henlo",
      description: "Stay in touch with those you care about",
      url: "https://apps.apple.com/app/henlo/id1643404410",
      image: "../../images/henlo-icon.png",
      iconName: "henloIcon",
    },
    {
      title: "Peat",
      description: "Peat is a habit tracking app that keeps you motivated",
      url: "https://apps.apple.com/us/app/habit-tracker-peat/id6449402568",
      image: "../../images/peat-icon.png",
      iconName: "peatIcon",
    },
    {
      title: "Stoins",
      description: "The only step counter that motivates you to walk more",
      url: "https://apps.apple.com/us/app/stoins/id6443662308",
      image: "../../images/stoins-icon.png",
      iconName: "stoinsIcon",
    },
  ];

  // Function to select a random app
  function getRandomApp() {
    const randomIndex = Math.floor(Math.random() * apps.length);
    return apps[randomIndex];
  }

  const randomApp = getRandomApp();

  function getAppImageUrl(title: string): string | undefined {
    switch (title) {
      case "Henlo":
        return henloIcon.src; // Assuming 'src' is the property that holds the URL string
      case "Peat":
        return peatIcon.src;
      case "Stoins":
        return stoinsIcon.src;
      // Handle the default case appropriately
      default:
        return undefined;
    }
  }

  // Assuming getAppImageUrl returns string or undefined
  const appImageUrl: string | undefined = getAppImageUrl(randomApp.title);

  return (
    <a href={randomApp.url} className={styles.anchorStyle}>
      <div className={styles.container}>
        <img
          src={appImageUrl}
          alt={`${randomApp.title} Icon`}
          width={60}
          height={60}
          className={styles.icon}
        />

        <div
          class="title-and-description"
          className={styles.titleAndDescription}
        >
          <h3>{randomApp.title}</h3>
          <p>{randomApp.description}</p>
        </div>

        <img
          src="src/images/app-store.svg"
          alt={`Download ${randomApp.title}`}
          width={160}
          height={60}
          className={styles.appStore}
        />
      </div>
    </a>
  );
}
