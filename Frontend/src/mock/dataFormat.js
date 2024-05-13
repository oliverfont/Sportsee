import calorieIcon from '../assets/calories-icon.svg';
import proteinIcon from '../assets/protein-icon.svg';
import carbohydrateIcon from '../assets/carbs-icon.svg';
import lipidIcon from '../assets/fat-icon.svg';

class NutriFormatter {
    static formatNutriData(nutriData) {
      if (!nutriData) return null;
  
      return [
        { label: 'Calories', value: `${nutriData.calorieCount}kCal`, icon: calorieIcon },
        { label: 'Protéines', value: `${nutriData.proteinCount}g`, icon: proteinIcon },
        { label: 'Glucides', value: `${nutriData.carbohydrateCount}g`, icon: carbohydrateIcon },
        { label: 'Lipides', value: `${nutriData.lipidCount}g`, icon: lipidIcon }
      ];
    }
  }

class PerformanceFormatter {
  static formatPerformanceData(performanceData) {
    if (!performanceData) return null;

    const performanceNames = {
      1: 'cardio',
      2: 'Energie',
      3: 'Endurance',
      4: 'Force',
      5: 'Vitesse',
      6: 'Intensité'
    };

    return Object.keys(performanceData.kind).map(key => ({
      kind: performanceNames[key],
      value: performanceData.data.find(item => item.kind === parseInt(key))?.value || 0
    })).sort((a, b) => a.kind === 'Intensité' ? -1 : b.kind === 'Intensité' ? 1 : 0);
  }
}

class SessionFormatter {
    static formatSessionData(sessionData) {
      if (!sessionData || !sessionData.data || !sessionData.data.sessions.length) {
        return null;
      }
  
      const dayNames = {
        0: 'D',
        1: 'L',
        2: 'M',
        3: 'M',
        4: 'J',
        5: 'V',
        6: 'S',
        7: 'D',
        8: 'L'
      };
  
      return sessionData.data.sessions.map(session => ({
        day: dayNames[session.day],
        sessionLength: session.sessionLength
      }));
    }
}


export { NutriFormatter, PerformanceFormatter, SessionFormatter };
