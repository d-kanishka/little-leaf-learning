
export const animalsData = [
  {
    id: "animal-1",
    name: "Dog",
    emoji: "🐶",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop",
    description: "Dogs are loyal pets who love to play and protect their family.",
    shelter: "kennel",
    shelterName: "Kennel",
    category: "domestic",
    soundText: "Woof woof! I am a dog!",
    outlineImage:"/src/assets/dog_ot.png"
  },
  {
    id: "animal-2",
    name: "Cat",
    emoji: "🐱",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop",
    description: "Cats are soft and cuddly pets who love to sleep in warm places.",
    shelter: "home",
    shelterName: "Home",
    category: "domestic",
    soundText: "Meow meow! I am a cat!",
    outlineImage:"/src/assets/cat_ot.png"
  },
  {
    id: "animal-3",
    name: "Cow",
    emoji: "🐄",
    image: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=400&h=400&fit=crop",
    description: "Cows give us milk. They eat grass and live on farms.",
    shelter: "shed",
    shelterName: "Cowshed",
    category: "domestic",
    soundText: "Moo moo! I am a cow!",
    outlineImage:"/src/assets/cow_ot.png"
  },
  {
    id: "animal-4",
    name: "Horse",
    emoji: "🐴",
    image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=400&fit=crop",
    description: "Horses are strong animals. People ride them and they run very fast.",
    shelter: "stable",
    shelterName: "Stable",
    category: "domestic",
    soundText: "Neigh neigh! I am a horse!",
    outlineImage:"/src/assets/horse_ot.png"
  },
  {
    id: "animal-5",
    name: "Rabbit",
    emoji: "🐰",
    image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=400&fit=crop",
    description: "Rabbits have long ears and hop around. They love to eat carrots.",
    shelter: "burrow",
    shelterName: "Burrow",
    category: "domestic",
    soundText: "Squeak squeak! I am a rabbit!",
    outlineImage:"/src/assets/ra_ot.png"
  },

  {
    id: "animal-6",
    name: "Sparrow",
    emoji: "🐦",
    image: "https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=400&h=400&fit=crop",
    description: "Sparrows are small birds that chirp. They make nests in trees.",
    shelter: "trees",
    shelterName: "Trees",
    category: "bird",
    soundText: "Chirp chirp! I am a sparrow!",
    outlineImage:"/src/assets/sp_ot.png"
  },
  {
    id: "animal-7",
    name: "Hen",
    emoji: "🐔",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=400&fit=crop",
    description: "Hens lay eggs. They live in coops and say cluck cluck.",
    shelter: "coop",
    shelterName: "Coop",
    category: "bird",
    soundText: "Cluck cluck! I am a hen!",
    outlineImage:"/src/assets/hen_ot.png"
  },
  {
    id: "animal-8",
    name: "Duck",
    emoji: "🦆",
    image: "https://images.unsplash.com/photo-1459682687441-7761439a709d?w=400&h=400&fit=crop",
    description: "Ducks swim in water and waddle on land. They say quack quack.",
    shelter: "Ponds/Lakes",
    shelterName: "Ponds/Lakes",
    category: "bird",
    soundText: "Quack quack! I am a duck!",
    outlineImage:"/src/assets/duck_ot.png"
  },

  {
    id: "animal-9",
    name: "Fish",
    emoji: "🐟",
    image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=400&h=400&fit=crop",
    description: "Fish live in water and breathe through gills. They swim with fins.",
    shelter: "water",
    shelterEmoji: "🌊",
    shelterName: "Water",
    category: "water",
    soundText: "Bubble bubble! I am a fish!",
    outlineImage:"/src/assets/fish_ot.png"
  },
  {
    id: "animal-10",
    name: "Turtle",
    emoji: "🐢",
    image: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=400&h=400&fit=crop",
    description: "Turtles carry their home on their back. They live in water and on land.",
    shelter: "Forest",
    shelterName: "Forest",
    category: "water",
    soundText: "I am a turtle! I move slowly!",
    outlineImage:"/src/assets/tu_ot.png"
  },

  {
    id: "animal-11",
    name: "Butterfly",
    emoji: "🦋",
    image: "/src/assets/butterfly.png",
    description: "Butterflies have beautiful colorful wings. They fly from flower to flower.",
    shelter: "garden",
    shelterName: "Garden",
    category: "insect",
    soundText: "Flutter flutter! I am a butterfly!",
    outlineImage:"/src/assets/bf_ot.png"
  },
  {
    id: "animal-12",
    name: "Snail",
    emoji: "🐌",
    image: "/src/assets/snail.png",
    description: "Snails carry their shell on their back and move very slowly.",
    shelter: "shell",
    shelterName: "Shell",
    category: "insect",
    soundText: "I am a snail! I move slowly!",
    outlineImage:"/src/assets/snail_ot.png"
  },
  {
    id: "animal-13",
    name: "Ladybug",
    emoji: "🐞",
    image: "/src/assets/ladybug.png",
    description: "Ladybugs are small red insects with black spots. They live on plants.",
    shelter: "leaves",
    shelterName: "Leaves",
    category: "insect",
    soundText: "I am a ladybug! I live on leaves!",
    outlineImage:"/src/assets/lb_ot.png"
  }
];
import React from 'react';
import { Leaf, TreeDeciduous, Sun, Cloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AudioToggle from '../components/AudioToggle';
import { useAudio } from '../contexts/AudioContext';

const categoryColors = {
  animals: 'from-amber-200 to-orange-300',
  plants: 'from-emerald-200 to-green-300',
  weather: 'from-sky-200 to-blue-300',
  seasons: 'from-rose-200 to-pink-300'
};

const categoryEmojis = {
  animals: '🦁',
  plants: '🌱',
  weather: '☀️',
  seasons: '🍂'
};

export default function HomePage() {
  const navigate = useNavigate();
  const { playSound } = useAudio();

  const handleCategoryClick = (path) => {
    playSound('click');
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-nature-gradient pb-20">
      <AudioToggle />

      {/* Header */}
      <header className="pt-12 pb-8 px-4 relative">
        <div className="max-w-2xl mx-auto text-center">
          {/* Decorative icons */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <TreeDeciduous className="w-8 h-8 text-secondary/90 animate-leaf-float" />
            <Sun className="w-10 h-10 text-accent/100 animate-soft-pulse" />
            <Cloud className="w-7 h-7 text-primary/100 animate-leaf-float" style={{ animationDelay: '0.5s' }} />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-3 animate-slide-up flex items-center justify-center gap-3">
            
            <span>Little Leaf Learning</span>
          </h1>
          <p className="text-xl text-muted-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Explore the beautiful world of nature!
          </p>
        </div>
      </header>

      {/* Category buttons */}
      <main className="px-6 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.path)}
                className={`
                  bg-gradient-to-br ${categoryColors[category.id]}
                  rounded-3xl p-8 shadow-lg
                  hover:scale-105 active:scale-95
                  transition-all duration-300
                  flex flex-col items-center justify-center
                  min-h-[160px]
                  animate-pop-in
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-6xl mb-4 drop-shadow-md">
                  {categoryEmojis[category.id]}
                </span>
                <span className="text-xl font-bold text-foreground">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* footer */}
      <footer className="fixed bottom-0 left-0 right-0 h-16 flex items-center justify-center gap-3 bg-gradient-to-t from-background to-transparent">
        {[...Array(5)].map((_, i) => (
          <Leaf
            key={i}
            className="w-5 h-5 text-secondary/100 animate-leaf-float"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </footer>
    </div>
  );
}
// Animal shelters for matching game
export const animalShelters = [
  { id: "kennel", name: "Kennel", emoji: "🏠", image: "/assets/kennel.png" },
  { id: "home", name: "Home", emoji: "🏡", image: "" },
  { id: "shed", name: "Cowshed", emoji: "🏚️", image: "/assets/cowshed.png" },
  { id: "stable", name: "Stable", emoji: "", image: "/assets/stable.png" },
  { id: "burrow", name: "Burrow", emoji: "🕳️", image: "" },
  { id: "nest", name: "Nest", emoji: "🪹", image: "" },
  { id: "coop", name: "Coop", emoji: "🏠", image: "/assets/coop.png" },
  { id: "water", name: "Water", emoji: "🌊", image: "" },
  { id: "shell", name: "Shell", emoji: "🐚", image: "" },
  { id: "garden", name: "Garden", emoji: "🌺", image: "/assets/garden.png" },
  { id: "leaves", name: "Leaves", emoji: "🍃", image: "/assets/leaf.png" }
];

export const plantsData = [
  {
    id: "plant-1",
    name: "Tree",
    emoji: "🌳",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&h=400&fit=crop",
    description: "Trees are tall plants with roots, trunk, branches and leaves.",
    parts: ["Root", "Trunk", "Branches", "Leaves"],
    partsEmoji: ["🌱", "🪵", "🌿", "🍃"],
    type: "tree"
  },
  {
    id: "plant-2",
    name: "Flower",
    emoji: "🌸",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop",
    description: "Flowers have petals and stem. They are colorful and smell nice.",
    parts: ["Petals", "Stem", "Leaves"],
    partsEmoji: ["🌸", "🌿", "🍃"],
    type: "flower"
  },
  {
    id: "plant-3",
    name: "Small Plant",
    emoji: "🌱",
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop",
    description: "Small plants have a stem and leaves. They grow from seeds.",
    parts: ["Stem", "Leaves"],
    partsEmoji: ["🌿", "🍃"],
    type: "plant"
  },
  {
    id: "plant-4",
    name: "Carrot Plant",
    emoji: "🥕",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
    description: "Carrots grow under the ground. They have leaves above and root below.",
    parts: ["Leaves", "Root"],
    partsEmoji: ["🍃", "🥕"],
    type: "vegetable"
  },
  {
    id: "plant-5",
    name: "Apple Tree",
    emoji: "🍎",
    image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=400&h=400&fit=crop",
    description: "Apple trees give us sweet apples. They have fruits and leaves.",
    parts: ["Fruit", "Leaves", "Trunk"],
    partsEmoji: ["🍎", "🍃", "🪵"],
    type: "fruit"
  }
];
 
export const weatherData = [
  {
    id: "weather-1",
    name: "Sunny",
    emoji: "☀️",
    image: "https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=400&h=400&fit=crop",
    gifPlaceholder: "/placeholder.svg", // Placeholder for user's GIF
    description: "The sun is bright in the sky. It is warm and great for playing outside!",
    clothes: ["T-shirt", "Shorts", "Sunglasses", "Hat"],
    clothesEmoji: ["👕", "🩳", "🕶️", "👒"],
    animation: "sunny"
  },
  {
    id: "weather-2",
    name: "Rainy",
    emoji: "🌧️",
    image: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=400&h=400&fit=crop",
    gifPlaceholder: "/placeholder.svg",
    description: "Water drops fall from clouds. We need umbrella and raincoat!",
    clothes: ["Raincoat", "Umbrella", "Boots"],
    clothesEmoji: ["🧥", "☂️", "👢"],
    animation: "rainy"
  },
  {
    id: "weather-3",
    name: "Cloudy",
    emoji: "☁️",
    image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=400&h=400&fit=crop",
    gifPlaceholder: "/placeholder.svg",
    description: "Grey clouds cover the sky. It might rain later.",
    clothes: ["Jacket", "Long Pants"],
    clothesEmoji: ["🧥", "👖"],
    animation: "cloudy"
  },
  {
    id: "weather-4",
    name: "Windy",
    emoji: "🌬️",
    image: "/src/assets/windy.png",
    gifPlaceholder: "/placeholder.svg",
    description: "Wind blows and leaves move. Trees sway in the breeze.",
    clothes: ["Jacket", "Scarf"],
    clothesEmoji: ["🧥", "🧣"],
    animation: "windy"
  },
  {
    id: "weather-5",
    name: "Snowy",
    emoji: "❄️",
    image: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=400&h=400&fit=crop",
    gifPlaceholder: "/placeholder.svg",
    description: "Snow falls and it is very cold. Wear warm clothes!",
    clothes: ["Coat", "Scarf", "Gloves", "Boots"],
    clothesEmoji: ["🧥", "🧣", "🧤", "👢"],
    animation: "snowy"
  }
];

export const seasonsData = [
  {
    id: "season-1",
    name: "Spring",
    emoji: "🌸",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop",
    gifPlaceholder: "/assets/spring.gif",
    description: "Flowers bloom and baby animals are born. Weather gets warmer.",
    natureChange: "Flowers bloom",
    bgColor: "from-pink-200 to-green-200",
    clothes: ["Light Jacket", "T-shirt"],
    clothesEmoji: ["🧥", "👕"]
  },
  {
    id: "season-2",
    name: "Summer",
    emoji: "☀️",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop",
    gifPlaceholder: "/public/assets/summer.gif",
    description: "The sun is bright and days are long. Perfect for swimming!",
    natureChange: "Sun shines bright",
    bgColor: "from-yellow-200 to-orange-200",
    clothes: ["T-shirt", "Shorts", "Sunglasses"],
    clothesEmoji: ["👕", "🩳", "🕶️"]
  },
  {
    id: "season-3",
    name: "Autumn",
    emoji: "🍂",
    image: "/src/assets/autum.png",
    gifPlaceholder: "/public/assets/autum.gif",
    description: "Leaves change color and fall from trees. Weather becomes cool.",
    natureChange: "Leaves fall",
    bgColor: "from-orange-300 to-amber-400",
    clothes: ["Sweater", "Jacket"],
    clothesEmoji: ["🧶", "🧥"]
  },
  {
    id: "season-4",
    name: "Winter",
    emoji: "❄️",
    image: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=400&h=400&fit=crop",
    gifPlaceholder: "/public/assets/snowfall.gif",
    description: "Snow falls and it is very cold. Animals rest and stay warm.",
    natureChange: "Snow falls",
    bgColor: "from-blue-100 to-white",
    clothes: ["Coat", "Scarf", "Gloves", "Boots"],
    clothesEmoji: ["🧥", "🧣", "🧤", "👢"]
  }
];

// Items for season matching game
export const seasonMatchItems = [
  { id: "flower", name: "Flower", emoji: "🌸", season: "Spring" },
  { id: "butterfly", name: "Butterfly", emoji: "🦋", season: "Spring" },
  { id: "icecream", name: "Ice cream", emoji: "🍦", season: "Summer" },
  { id: "sunglasses", name: "Sunglasses", emoji: "🕶️", season: "Summer" },
  { id: "leaf", name: "Leaf", emoji: "🍂", season: "Autumn" },
  { id: "pumpkin", name: "Pumpkin", emoji: "🎃", season: "Autumn" },
  { id: "jacket", name: "Jacket", emoji: "🧥", season: "Winter" },
  { id: "snowman", name: "Snowman", emoji: "⛄", season: "Winter" }
];

// All categories for navigation
export const categories = [
  { id: "animals", name: "Animals", emoji: "🐶", path: "/animals", color: "primary" },
  { id: "plants", name: "Plants", emoji: "🌱", path: "/plants", color: "secondary" },
  { id: "weather", name: "Weather", emoji: "☀️", path: "/weather", color: "primary" },
  { id: "seasons", name: "Seasons", emoji: "🍂", path: "/seasons", color: "secondary" }
];

// Game types for each category
export const animalGames = [
  { id: "tap-learn", name: "Tap & Learn", emoji: "🎵", description: "Tap animal to hear its sound", path: "/games/animals/tap-learn" },
  { id: "sound-match", name: "Find Sound", emoji: "👂", description: "Listen and find the animal", path: "/games/animals/sound-match" },
  { id: "drag-drop", name: "Match Shelter", emoji: "🏠", description: "Drag animals to their homes", path: "/games/animals/drag-drop" },
  { id: "coloring", name: "Coloring", emoji: "🎨", description: "Color the animals", path: "/games/animals/coloring" }
];

export const plantGames = [
  { id: "tap-part", name: "Tap the Part", emoji: "👆", description: "Tap the leaf, petal, or root", path: "/games/plants/tap-part" },
  { id: "matching", name: "Match Parts", emoji: "🧩", description: "Match parts to plants", path: "/games/plants/matching" },
  { id: "grow-plant", name: "Grow a Plant", emoji: "🌱", description: "Water to help plant grow", path: "/games/plants/grow" },
  { id: "coloring", name: "Coloring", emoji: "🎨", description: "Color the plants", path: "/games/plants/coloring" }
];

export const weatherGames = [
  { id: "today-weather", name: "Today's Weather", emoji: "🌤️", description: "Choose what matches outside", path: "/games/weather/today" },
  { id: "matching", name: "Match Weather", emoji: "🧩", description: "Match weather to picture", path: "/games/weather/matching" },
  { id: "dress-up", name: "Dress for Weather", emoji: "👗", description: "Pick right clothes", path: "/games/weather/dress" },
  { id: "tap-animation", name: "Tap Animation", emoji: "✨", description: "Tap to see weather happen", path: "/games/weather/animation" }
];

export const seasonGames = [
   { id: "wheel", name: "Season Wheel", emoji: "🎡", description: "Turn the wheel to see seasons", path: "/games/seasons/wheel" },
  { id: "matching", name: "Match Season", emoji: "🧩", description: "Match items to seasons", path: "/games/seasons/matching" },
  { id: "drawing", name: "Drawing Board", emoji: "🎨", description: "Draw about seasons", path: "/games/seasons/drawing" }
];

