import jobService from "@/services/api/job";
import repairImg from "@/assets/svg/jobs/repair.svg";
import electricityImg from "@/assets/svg/jobs/electricity.svg";
import gardenImg from "@/assets/svg/jobs/garden.svg";
import bikeImg from "@/assets/svg/jobs/bike-repair.svg";
import plumbingImg from "@/assets/svg/jobs/plumbing.svg";
import carImg from "@/assets/svg/jobs/car-repair.svg";
import locksmithImg from "@/assets/svg/jobs/locksmith.svg";
import houseApplianceImg from "@/assets/svg/jobs/house-appliance.png";

export const useJobImages = (job: string) => {
  switch (job) {
    case "Bricolage":
      return repairImg;
    case "Electricité":
      return electricityImg;
    case "Plomberie":
      return plumbingImg;
    case "Jardinage":
      return gardenImg;
    case "Serrurier":
      return locksmithImg;
    case "Electroménager":
      return houseApplianceImg;
    case "Réparation 2 roues (vélo, moto, scooter)":
      return bikeImg;
    case "Réparation voiture":
      return carImg;
  }
}
