import { useState, useEffect } from "preact/hooks";

type App = {
  title: string;
  description: string;
  url: string;
  image: string;
  iconName: string;
};

export default function AppAd() {
  const apps = [
    {
      title: "Henlo",
      description: "Stay in touch with those you care about",
      url: "https://apps.apple.com/app/henlo/id1643404410",
      image: "/images/henlo-icon.png",
      iconName: "henloIcon",
    },
    {
      title: "Peat",
      description: "Peat is a habit tracking app that keeps you motivated",
      url: "https://apps.apple.com/us/app/habit-tracker-peat/id6449402568",
      image: "/images/peat-icon.png",
      iconName: "peatIcon",
    },
    {
      title: "Stoins",
      description: "The only step counter that motivates you to walk more",
      url: "https://apps.apple.com/us/app/stoins/id6443662308",
      image: "/images/stoins-icon.png",
      iconName: "stoinsIcon",
    },
  ];

  // State to hold the selected app
  const [randomApp, setRandomApp] = useState<App | null>(null);

  // Function to select a random app
  const selectRandomApp = () => {
    const randomIndex = Math.floor(Math.random() * apps.length);
    setRandomApp(apps[randomIndex]);
  };

  // UseEffect hook to select an app when the component mounts
  useEffect(() => {
    selectRandomApp();
  }, []);

  // Return early if randomApp is not set yet
  if (!randomApp) return null;

  return (
    <a href={randomApp.url}>
      <div id="container">
        <img
          src={randomApp.image}
          alt={`${randomApp.title} Icon`}
          width={60}
          height={60}
          id="icon"
        />

        <div id="title-and-description">
          <h3>{randomApp.title}</h3>
          <p>{randomApp.description}</p>
        </div>

        <img
          src="src/images/app-store.svg"
          alt={`Download ${randomApp.title}`}
          width={160}
          height={60}
          id="appStore"
        />
      </div>
    </a>
  );
}
