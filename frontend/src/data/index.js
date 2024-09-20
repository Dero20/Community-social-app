import {
  FontAwesome,
  MaterialIcons,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";
import Toast from "react-native-root-toast";

export const allCategories = [
  {
    label: "Information Technology (IT)",
    value: "it",
    logo: <FontAwesome5 name="laptop-code" size={20} color="black" />,
    jobTitles: [
      { title: "Fix My Keyboard" },
      { title: "Fix My Mouse" },
      { title: "Fix My Monitor" },
      { title: "Fix My CPU" },
    ],
    jobContent: [
      {
        "Fix My Keyboard": [
          { content: "Keys are sticking or not responding." },
          { content: "Keyboard is not recognized by the computer." },
          { content: "Keyboard typing incorrect characters." },
        ],
      },
      {
        "Fix My Mouse": [
          { content: "Mouse cursor is not moving or lagging." },
          { content: "Left or right mouse button is not working." },
          { content: "Mouse is not detected by the computer." },
        ],
      },
      {
        "Fix My Monitor": [
          { content: "Monitor is not turning on or no display." },
          { content: "Screen flickering or showing distorted images." },
          { content: "Monitor showing 'No Signal' error." },
        ],
      },
      {
        "Fix My CPU": [
          { content: "CPU is overheating or fan noise is too loud." },
          { content: "Computer is freezing or crashing frequently." },
          { content: "CPU not booting or showing error codes." },
        ],
      },
    ],
  },
  {
    label: "Gardening",
    value: "gardening",
    logo: <FontAwesome name="leaf" size={20} color="green" />,
    jobTitles: [
      { title: "Lawn Mowing" },
      { title: "Planting Flowers" },
      { title: "Weeding" },
    ],
    jobContent: [
      {
        "Lawn Mowing": [
          { content: "Mowing the lawn to the desired height." },
          { content: "Edging around sidewalks and driveways." },
          { content: "Clearing grass clippings from paths." },
        ],
      },
      {
        "Planting Flowers": [
          { content: "Preparing the soil for planting." },
          { content: "Planting seasonal flowers." },
          { content: "Watering and fertilizing as needed." },
        ],
      },
      {
        Weeding: [
          { content: "Removing weeds from garden beds." },
          { content: "Applying weed prevention treatments." },
          { content: "Disposing of removed weeds." },
        ],
      },
    ],
  },
  {
    label: "Massage Therapy",
    value: "massage_therapy",
    logo: <FontAwesome5 name="spa" size={20} color="purple" />,
    jobTitles: [
      { title: "Full Body Massage" },
      { title: "Deep Tissue Massage" },
      { title: "Foot Massage" },
    ],
    jobContent: [
      {
        "Full Body Massage": [
          { content: "Relieving overall muscle tension." },
          { content: "Promoting relaxation and stress relief." },
          { content: "Improving circulation." },
        ],
      },
      {
        "Deep Tissue Massage": [
          { content: "Focusing on deep muscle layers." },
          { content: "Alleviating chronic pain." },
          { content: "Releasing muscle knots." },
        ],
      },
      {
        "Foot Massage": [
          { content: "Relaxing foot muscles." },
          { content: "Improving blood flow to feet." },
          { content: "Reducing foot pain and discomfort." },
        ],
      },
    ],
  },
  {
    label: "Plumbing",
    value: "plumbing",
    logo: <FontAwesome name="wrench" size={20} color="blue" />,
    jobTitles: [
      { title: "Fix Leaky Faucet" },
      { title: "Unclog Drain" },
      { title: "Install New Sink" },
    ],
    jobContent: [
      {
        "Fix Leaky Faucet": [
          { content: "Replacing worn-out washers or seals." },
          { content: "Tightening or replacing faucet components." },
          { content: "Testing for leaks after repair." },
        ],
      },
      {
        "Unclog Drain": [
          { content: "Using a plunger or drain snake to remove clogs." },
          { content: "Applying chemical drain cleaners if necessary." },
          { content: "Ensuring smooth water flow after unclogging." },
        ],
      },
      {
        "Install New Sink": [
          { content: "Removing the old sink." },
          { content: "Installing the new sink and fixtures." },
          { content: "Connecting plumbing and testing for leaks." },
        ],
      },
    ],
  },
  {
    label: "Electrical Work",
    value: "electrical_work",
    logo: <MaterialIcons name="electrical-services" size={20} color="yellow" />,
    jobTitles: [
      { title: "Install Light Fixture" },
      { title: "Repair Electrical Outlet" },
      { title: "Upgrade Circuit Breaker" },
    ],
    jobContent: [
      {
        "Install Light Fixture": [
          { content: "Wiring and mounting the fixture." },
          { content: "Ensuring proper electrical connections." },
          { content: "Testing the fixture after installation." },
        ],
      },
      {
        "Repair Electrical Outlet": [
          { content: "Replacing damaged or faulty outlets." },
          { content: "Ensuring proper grounding and wiring." },
          { content: "Testing the outlet for safe operation." },
        ],
      },
      {
        "Upgrade Circuit Breaker": [
          { content: "Replacing old breakers with new ones." },
          { content: "Ensuring electrical code compliance." },
          { content: "Testing the circuit after the upgrade." },
        ],
      },
    ],
  },
  {
    label: "House Cleaning",
    value: "house_cleaning",
    logo: <MaterialIcons name="cleaning-services" size={20} color="brown" />,
    jobTitles: [
      { title: "General Cleaning" },
      { title: "Deep Cleaning" },
      { title: "Move-In/Move-Out Cleaning" },
    ],
    jobContent: [
      {
        "General Cleaning": [
          { content: "Dusting and vacuuming all rooms." },
          { content: "Cleaning bathrooms and kitchens." },
          { content: "Mopping floors and wiping surfaces." },
        ],
      },
      {
        "Deep Cleaning": [
          { content: "Cleaning hard-to-reach areas." },
          { content: "Scrubbing grout and tiles." },
          { content: "Polishing wood and furniture." },
        ],
      },
      {
        "Move-In/Move-Out Cleaning": [
          { content: "Cleaning all surfaces thoroughly." },
          { content: "Removing all trash and debris." },
          { content: "Ensuring the property is ready for new tenants." },
        ],
      },
    ],
  },
  {
    label: "Pest Control",
    value: "pest_control",
    logo: <Ionicons name="bug" size={20} color="red" />,
    jobTitles: [
      { title: "Insect Extermination" },
      { title: "Rodent Control" },
      { title: "Termite Treatment" },
    ],
    jobContent: [
      {
        "Insect Extermination": [
          { content: "Applying insecticides safely." },
          { content: "Identifying and treating infested areas." },
          { content: "Preventing future infestations." },
        ],
      },
      {
        "Rodent Control": [
          { content: "Setting traps and baits." },
          { content: "Sealing entry points." },
          { content: "Removing trapped rodents." },
        ],
      },
      {
        "Termite Treatment": [
          { content: "Inspecting for termite damage." },
          { content: "Applying chemical treatments." },
          { content: "Installing termite prevention systems." },
        ],
      },
    ],
  },
  {
    label: "Painting",
    value: "painting",
    logo: <FontAwesome name="paint-brush" size={20} color="orange" />,
    jobTitles: [
      { title: "Interior Painting" },
      { title: "Exterior Painting" },
      { title: "Wallpaper Installation" },
    ],
    jobContent: [
      {
        "Interior Painting": [
          { content: "Preparing walls and surfaces." },
          { content: "Applying primer and paint coats." },
          { content: "Cleaning up after the job is done." },
        ],
      },
      {
        "Exterior Painting": [
          { content: "Power washing surfaces." },
          { content: "Applying weather-resistant paint." },
          { content: "Ensuring even and durable coverage." },
        ],
      },
      {
        "Wallpaper Installation": [
          { content: "Measuring and cutting wallpaper." },
          { content: "Applying adhesive and hanging wallpaper." },
          { content: "Smoothing and trimming edges." },
        ],
      },
    ],
  },
  {
    label: "Appliance Repair",
    value: "appliance_repair",
    logo: <MaterialIcons name="build" size={20} color="gray" />,
    jobTitles: [
      { title: "Repair Refrigerator" },
      { title: "Fix Washing Machine" },
      { title: "Oven Repair" },
    ],
    jobContent: [
      {
        "Repair Refrigerator": [
          { content: "Diagnosing cooling issues." },
          { content: "Replacing worn-out parts." },
          { content: "Ensuring proper operation after repair." },
        ],
      },
      {
        "Fix Washing Machine": [
          { content: "Fixing leaks and drainage issues." },
          { content: "Replacing faulty motors." },
          { content: "Ensuring proper spin and wash cycles." },
        ],
      },
      {
        "Oven Repair": [
          { content: "Diagnosing heating problems." },
          { content: "Replacing heating elements." },
          { content: "Ensuring the oven heats evenly." },
        ],
      },
    ],
  },
  {
    label: "Security System Installation",
    value: "security_system_installation",
    logo: <FontAwesome name="shield" size={20} color="darkblue" />,
    jobTitles: [
      { title: "Install Security Cameras" },
      { title: "Install Alarm System" },
      { title: "Home Automation Setup" },
    ],
    jobContent: [
      {
        "Install Security Cameras": [
          { content: "Mounting cameras in strategic locations." },
          { content: "Connecting cameras to a monitoring system." },
          { content: "Testing camera feeds for clarity." },
        ],
      },
      {
        "Install Alarm System": [
          { content: "Setting up sensors and alarms." },
          { content: "Configuring control panels." },
          { content: "Testing the alarm system for reliability." },
        ],
      },
      {
        "Home Automation Setup": [
          { content: "Integrating smart home devices." },
          { content: "Setting up control hubs." },
          { content: "Testing automation routines." },
        ],
      },
    ],
  },
];

export const productCategories = [
  { label: "Electronics", value: "electronics" },
  { label: "Fashion & Apparel", value: "fashion_apparel" },
  { label: "Home & Kitchen", value: "home_kitchen" },
  { label: "Beauty & Personal Care", value: "beauty_personal_care" },
  { label: "Sports & Outdoors", value: "sports_outdoors" },
  { label: "Toys & Games", value: "toys_games" },
  { label: "Automotive", value: "automotive" },
  { label: "Books & Stationery", value: "books_stationery" },
  { label: "Health & Wellness", value: "health_wellness" },
  { label: "Grocery & Gourmet Food", value: "grocery_gourmet_food" },
  { label: "Pet Supplies", value: "pet_supplies" },
  { label: "Office Products", value: "office_products" },
  { label: "Baby Products", value: "baby_products" },
  { label: "Tools & Home Improvement", value: "tools_home_improvement" },
  { label: "Garden & Outdoor", value: "garden_outdoor" },
  { label: "Musical Instruments", value: "musical_instruments" },
  { label: "Movies & TV", value: "movies_tv" },
  { label: "Video Games", value: "video_games" },
  { label: "Jewelry & Accessories", value: "jewelry_accessories" },
  { label: "Arts & Crafts", value: "arts_crafts" },
];

export const baseURL = "http://10.0.2.2:4000";

export const triggerToast = ({ message, type, duration }) => {
  const toast = Toast.show(
    message || (type === "error" ? "Error" : "Success"),
    {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: "#004D40",
      textColor: "white",
      opacity: 100,
    }
  );

  setTimeout(() => {
    Toast.hide(toast);
  }, duration || 2000);
};
export const categories = [
  {
    label: "Information Technology (IT)",
    value: "it",
  },
  {
    label: "Gardening",
    value: "gardening",
  },
  {
    label: "Massage Therapy",
    value: "massage_therapy",
  },
  {
    label: "Plumbing",
    value: "plumbing",
  },
  {
    label: "Electrical Work",
    value: "electrical_work",
  },
  {
    label: "House Cleaning",
    value: "house_cleaning",
  },
  {
    label: "Pest Control",
    value: "pest_control",
  },
  {
    label: "Painting",
    value: "painting",
  },
  {
    label: "Appliance Repair",
    value: "appliance_repair",
  },
  {
    label: "Security System Installation",
    value: "security_system_installation",
  },
];