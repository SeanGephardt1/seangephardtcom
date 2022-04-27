// JavaScript source code
//  Frequency	Scientific - string, pitch, notation
//  1( E )	329.63 Hz	E4
//  2( B )	246.94 Hz	B3
//  3( G )	196.00 Hz	G3
//  4( D )	146.83 Hz	D3
//  5( A )	110.00 Hz	A2
//  6( E )	82.41 Hz	E2

const _frequencies = [
  { name: "E4", value: 329.63, hertz: "mhz" },
  { name: "B3", value: 246.94, hertz: "mhz" },
  { name: "G3", value: 196.00, hertz: "mhz" },
  { name: "D3", value: 148.83, hertz: "mhz" },
  { name: "A2", value: 110.00, hertz: "mhz" },
  { name: "E2", value: 82.41, hertz: "mhz" },
];

const _oscillators = {
  Square: "square",
  Triangle: "triangle",
  Sine: "sine"
};

const _guitar_6_tones = [
  { name: "E4", value: 329.63, hertz: "mhz" },
  { name: "B3", value: 246.94, hertz: "mhz"  },
  { name: "G3", value: 196.00, hertz: "mhz"  },
  { name: "D3", value: 148.83, hertz: "mhz"  },
  { name: "A2", value: 110.00, hertz: "mhz"  },
  { name: "E2", value: 82.41, hertz: "mhz"  },
];

export
{
  _frequencies as FrequencyData,
  _oscillators as Oscillators,
  _guitar_6_tones as GuitarTunerTones
};