// Converts HTML Entity To Degree Symbol
export const DegreeSymbol = '&#176;'.replace(/&#(\d+);/g,(match, dec)=>String.fromCharCode(dec))
