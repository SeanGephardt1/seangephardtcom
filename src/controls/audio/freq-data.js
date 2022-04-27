//  https://pages.mtu.edu/~suits/notefreqs.html
//  Frequency	Scientific - note name: octave, frequency value
//  including all for completeness
//  providing filtered array based on browser concerns
//  browser issue:
//  Oscillator.frequency.setValueAtTime value 7902.13
//  outside nominal range[ -1500, 1500 ]; value will be clamped.

const _audio_hertz = "Hz";

const _oscillator_types = {
  Sine: "sine",
  Square: "square",
  Sawtooth: "sawtooth",
  Triangle: "triangle",
};

const _frequencies_440 = [
  { name: "C", octave: 0, value: 16.35 },
  { name: "C#", octave: 0, value: 17.32 },
  { name: "D", octave: 0, value: 18.35 },
  { name: "D#", octave: 0, value: 19.45 },
  { name: "E", octave: 0, value: 20.60 },
  { name: "F", octave: 0, value: 21.83 },
  { name: "F#", octave: 0, value: 23.12 },
  { name: "G", octave: 0, value: 24.50 },
  { name: "G#", octave: 0, value: 25.96 },
  { name: "A", octave: 0, value: 27.50 },
  { name: "A#", octave: 0, value: 29.14 },
  { name: "B", octave: 0, value: 30.87 },

  { name: "C", octave: 1, value: 32.70 },
  { name: "C#", octave: 1, value: 34.65 },
  { name: "D", octave: 1, value: 36.71 },
  { name: "D#", octave: 1, value: 38.89 },
  { name: "E", octave: 1, value: 41.20 },
  { name: "F", octave: 1, value: 43.65 },
  { name: "F#", octave: 1, value: 46.25 },
  { name: "G", octave: 1, value: 49.00 },
  { name: "G#", octave: 1, value: 51.91 },
  { name: "A", octave: 1, value: 55.00 },
  { name: "A#", octave: 1, value: 58.27 },
  { name: "B", octave: 1, value: 61.74 },

  { name: "C", octave: 2, value: 65.41 },
  { name: "C#", octave: 2, value: 69.30 },
  { name: "D", octave: 2, value: 73.42 },
  { name: "D#", octave: 2, value: 77.78 },
  { name: "E", octave: 2, value: 82.41 },
  { name: "F", octave: 2, value: 87.31 },
  { name: "F#", octave: 2, value: 92.50 },
  { name: "G", octave: 2, value: 98.00 },
  { name: "G#", octave: 2, value: 103.83 },
  { name: "A", octave: 2, value: 110.00 },
  { name: "A#", octave: 2, value: 116.54 },
  { name: "B", octave: 2, value: 123.47 },

  { name: "C", octave: 3, value: 130.81 },
  { name: "C#", octave: 3, value: 138.59 },
  { name: "D", octave: 3, value: 146.83 },
  { name: "D#", octave: 3, value: 155.56 },
  { name: "E", octave: 3, value: 164.81 },
  { name: "F", octave: 3, value: 174.61 },
  { name: "F#", octave: 3, value: 185.00 },
  { name: "G", octave: 3, value: 196.00 },
  { name: "G#", octave: 3, value: 207.85 },
  { name: "A", octave: 3, value: 220.00 },
  { name: "A#", octave: 3, value: 233.08 },
  { name: "B", octave: 3, value: 246.94 },

  { name: "C", octave: 4, value: 261.63 },
  { name: "C#", octave: 4, value: 277.18 },
  { name: "D", octave: 4, value: 293.66 },
  { name: "D#", octave: 4, value: 311.13 },
  { name: "E", octave: 4, value: 329.63 },
  { name: "F", octave: 4, value: 349.23 },
  { name: "F#", octave: 4, value: 369.99 },
  { name: "G", octave: 4, value: 392.00 },
  { name: "G#", octave: 4, value: 415.30 },
  { name: "A", octave: 4, value: 440.00 },
  { name: "A#", octave: 4, value: 466.16 },
  { name: "B", octave: 4, value: 493.88 },

  { name: "C", octave: 5, value: 523.25 },
  { name: "C#", octave: 5, value: 554.37 },
  { name: "D", octave: 5, value: 587.33 },
  { name: "D#", octave: 5, value: 622.25 },
  { name: "E", octave: 5, value: 659.25 },
  { name: "F", octave: 5, value: 698.46 },
  { name: "F#", octave: 5, value: 739.99 },
  { name: "G", octave: 5, value: 783.99 },
  { name: "G#", octave: 5, value: 830.61 },
  { name: "A", octave: 5, value: 880.00 },
  { name: "A#", octave: 5, value: 932.33 },
  { name: "B", octave: 5, value: 987.77 },

  { name: "C", octave: 6, value: 1046.50 },
  { name: "C#", octave: 6, value: 1108.73 },
  { name: "D", octave: 6, value: 1174.66 },
  { name: "D#", octave: 6, value: 1244.51 },
  { name: "E", octave: 6, value: 1318.51 },
  { name: "F", octave: 6, value: 1396.91 },
  { name: "F#", octave: 6, value: 1479.98 },
  { name: "G", octave: 6, value: 1567.98 },
  { name: "G#", octave: 6, value: 1661.22 },
  { name: "A", octave: 6, value: 1760.00 },
  { name: "A#", octave: 6, value: 1864.66 },
  { name: "B", octave: 6, value: 1975.53 },

  { name: "C", octave: 7, value: 2093.00 },
  { name: "C#", octave: 7, value: 2217.46 },
  { name: "D", octave: 7, value: 2349.32 },
  { name: "D#", octave: 7, value: 2489.02 },
  { name: "E", octave: 7, value: 2637.02 },
  { name: "F", octave: 7, value: 2793.83 },
  { name: "F#", octave: 7, value: 2959.96 },
  { name: "G", octave: 7, value: 3135.96 },
  { name: "G#", octave: 7, value: 3322.44 },
  { name: "A", octave: 7, value: 3520.00 },
  { name: "A#", octave: 7, value: 3729.31 },
  { name: "B", octave: 7, value: 3951.07 },

  { name: "C", octave: 8, value: 4186.01 },
  { name: "C#", octave: 8, value: 4434.92 },
  { name: "D", octave: 8, value: 4968.63 },
  { name: "D#", octave: 8, value: 4978.03 },
  { name: "E", octave: 8, value: 5274.04 },
  { name: "F", octave: 8, value: 5587.65 },
  { name: "F#", octave: 8, value: 5919.91 },
  { name: "G", octave: 8, value: 6271.93 },
  { name: "G#", octave: 8, value: 6644.88 },
  { name: "A", octave: 8, value: 7040.00 },
  { name: "A#", octave: 8, value: 7458.62 },
  { name: "B", octave: 8, value: 7902.13 },
];

//  FILTERING FOR AUDIBLE OCTAVES
//  return note.value < 1500.00 && note.value > 30.00;
const _filtered_440 = _frequencies_440.filter( function ( note )
{
  return note.octave > 0 && note.octave < 6;
});
//  console.debug( '_filtered_440', _filtered_440 );


const _guitar_6_tones = [
  _frequencies_440[ 52 ], //  E4
  _frequencies_440[ 47 ], //  B3
  _frequencies_440[ 43 ], //  G3
  _frequencies_440[ 38 ], //  D3
  _frequencies_440[ 33 ], //  A2
  _frequencies_440[ 28 ]  //  E2
];

export
{
  _frequencies_440 as Frequencies440,
  _filtered_440 as Frequencies440Filtered,
  _oscillator_types as Oscillators,
  _guitar_6_tones as GuitarTunerTones,
  _audio_hertz as AudioHertz
};