import { decode } from "./decode";
import { Parser } from "./parse";
const nameTableNames = [
  "copyright", // 0
  "fontFamily", // 1
  "fontSubfamily", // 2
  "uniqueID", // 3
  "fullName", // 4
  "version", // 5
  "postScriptName", // 6
  "trademark", // 7
  "manufacturer", // 8
  "designer", // 9
  "description", // 10
  "manufacturerURL", // 11
  "designerURL", // 12
  "license", // 13
  "licenseURL", // 14
  "reserved", // 15
  "preferredFamily", // 16
  "preferredSubfamily", // 17
  "compatibleFullName", // 18
  "sampleText", // 19
  "postScriptFindFontName", // 20
  "wwsFamily", // 21
  "wwsSubfamily" // 22
];
interface ILangMap {
  [x: number]: string;
}
interface ILang {
  [x: string]: string | ILang | undefined;
}
export interface INames extends ILang {
  fontSubfamily: ILang;
  copyright: ILang;
  fontFamily: ILang;
  uniqueID?: ILang;
  fullName: ILang;
  version: ILang;
  postScriptName: ILang;
  trademark: ILang;
  manufacturer: ILang;
  manufacturerURL: ILang;
  license: ILang;
  licenseURL: ILang;
}
const macLanguages: ILangMap = {
  0: "en",
  1: "fr",
  2: "de",
  3: "it",
  4: "nl",
  5: "sv",
  6: "es",
  7: "da",
  8: "pt",
  9: "no",
  10: "he",
  11: "ja",
  12: "ar",
  13: "fi",
  14: "el",
  15: "is",
  16: "mt",
  17: "tr",
  18: "hr",
  19: "zh-Hant",
  20: "ur",
  21: "hi",
  22: "th",
  23: "ko",
  24: "lt",
  25: "pl",
  26: "hu",
  27: "es",
  28: "lv",
  29: "se",
  30: "fo",
  31: "fa",
  32: "ru",
  33: "zh",
  34: "nl-BE",
  35: "ga",
  36: "sq",
  37: "ro",
  38: "cz",
  39: "sk",
  40: "si",
  41: "yi",
  42: "sr",
  43: "mk",
  44: "bg",
  45: "uk",
  46: "be",
  47: "uz",
  48: "kk",
  49: "az-Cyrl",
  50: "az-Arab",
  51: "hy",
  52: "ka",
  53: "mo",
  54: "ky",
  55: "tg",
  56: "tk",
  57: "mn-CN",
  58: "mn",
  59: "ps",
  60: "ks",
  61: "ku",
  62: "sd",
  63: "bo",
  64: "ne",
  65: "sa",
  66: "mr",
  67: "bn",
  68: "as",
  69: "gu",
  70: "pa",
  71: "or",
  72: "ml",
  73: "kn",
  74: "ta",
  75: "te",
  76: "si",
  77: "my",
  78: "km",
  79: "lo",
  80: "vi",
  81: "id",
  82: "tl",
  83: "ms",
  84: "ms-Arab",
  85: "am",
  86: "ti",
  87: "om",
  88: "so",
  89: "sw",
  90: "rw",
  91: "rn",
  92: "ny",
  93: "mg",
  94: "eo",
  128: "cy",
  129: "eu",
  130: "ca",
  131: "la",
  132: "qu",
  133: "gn",
  134: "ay",
  135: "tt",
  136: "ug",
  137: "dz",
  138: "jv",
  139: "su",
  140: "gl",
  141: "af",
  142: "br",
  143: "iu",
  144: "gd",
  145: "gv",
  146: "ga",
  147: "to",
  148: "el-polyton",
  149: "kl",
  150: "az",
  151: "nn"
};
const windowsLanguages: ILangMap = {
  0x0436: "af",
  0x041c: "sq",
  0x0484: "gsw",
  0x045e: "am",
  0x1401: "ar-DZ",
  0x3c01: "ar-BH",
  0x0c01: "ar",
  0x0801: "ar-IQ",
  0x2c01: "ar-JO",
  0x3401: "ar-KW",
  0x3001: "ar-LB",
  0x1001: "ar-LY",
  0x1801: "ary",
  0x2001: "ar-OM",
  0x4001: "ar-QA",
  0x0401: "ar-SA",
  0x2801: "ar-SY",
  0x1c01: "aeb",
  0x3801: "ar-AE",
  0x2401: "ar-YE",
  0x042b: "hy",
  0x044d: "as",
  0x082c: "az-Cyrl",
  0x042c: "az",
  0x046d: "ba",
  0x042d: "eu",
  0x0423: "be",
  0x0845: "bn",
  0x0445: "bn-IN",
  0x201a: "bs-Cyrl",
  0x141a: "bs",
  0x047e: "br",
  0x0402: "bg",
  0x0403: "ca",
  0x0c04: "zh-HK",
  0x1404: "zh-MO",
  0x0804: "zh",
  0x1004: "zh-SG",
  0x0404: "zh-TW",
  0x0483: "co",
  0x041a: "hr",
  0x101a: "hr-BA",
  0x0405: "cs",
  0x0406: "da",
  0x048c: "prs",
  0x0465: "dv",
  0x0813: "nl-BE",
  0x0413: "nl",
  0x0c09: "en-AU",
  0x2809: "en-BZ",
  0x1009: "en-CA",
  0x2409: "en-029",
  0x4009: "en-IN",
  0x1809: "en-IE",
  0x2009: "en-JM",
  0x4409: "en-MY",
  0x1409: "en-NZ",
  0x3409: "en-PH",
  0x4809: "en-SG",
  0x1c09: "en-ZA",
  0x2c09: "en-TT",
  0x0809: "en-GB",
  0x0409: "en",
  0x3009: "en-ZW",
  0x0425: "et",
  0x0438: "fo",
  0x0464: "fil",
  0x040b: "fi",
  0x080c: "fr-BE",
  0x0c0c: "fr-CA",
  0x040c: "fr",
  0x140c: "fr-LU",
  0x180c: "fr-MC",
  0x100c: "fr-CH",
  0x0462: "fy",
  0x0456: "gl",
  0x0437: "ka",
  0x0c07: "de-AT",
  0x0407: "de",
  0x1407: "de-LI",
  0x1007: "de-LU",
  0x0807: "de-CH",
  0x0408: "el",
  0x046f: "kl",
  0x0447: "gu",
  0x0468: "ha",
  0x040d: "he",
  0x0439: "hi",
  0x040e: "hu",
  0x040f: "is",
  0x0470: "ig",
  0x0421: "id",
  0x045d: "iu",
  0x085d: "iu-Latn",
  0x083c: "ga",
  0x0434: "xh",
  0x0435: "zu",
  0x0410: "it",
  0x0810: "it-CH",
  0x0411: "ja",
  0x044b: "kn",
  0x043f: "kk",
  0x0453: "km",
  0x0486: "quc",
  0x0487: "rw",
  0x0441: "sw",
  0x0457: "kok",
  0x0412: "ko",
  0x0440: "ky",
  0x0454: "lo",
  0x0426: "lv",
  0x0427: "lt",
  0x082e: "dsb",
  0x046e: "lb",
  0x042f: "mk",
  0x083e: "ms-BN",
  0x043e: "ms",
  0x044c: "ml",
  0x043a: "mt",
  0x0481: "mi",
  0x047a: "arn",
  0x044e: "mr",
  0x047c: "moh",
  0x0450: "mn",
  0x0850: "mn-CN",
  0x0461: "ne",
  0x0414: "nb",
  0x0814: "nn",
  0x0482: "oc",
  0x0448: "or",
  0x0463: "ps",
  0x0415: "pl",
  0x0416: "pt",
  0x0816: "pt-PT",
  0x0446: "pa",
  0x046b: "qu-BO",
  0x086b: "qu-EC",
  0x0c6b: "qu",
  0x0418: "ro",
  0x0417: "rm",
  0x0419: "ru",
  0x243b: "smn",
  0x103b: "smj-NO",
  0x143b: "smj",
  0x0c3b: "se-FI",
  0x043b: "se",
  0x083b: "se-SE",
  0x203b: "sms",
  0x183b: "sma-NO",
  0x1c3b: "sms",
  0x044f: "sa",
  0x1c1a: "sr-Cyrl-BA",
  0x0c1a: "sr",
  0x181a: "sr-Latn-BA",
  0x081a: "sr-Latn",
  0x046c: "nso",
  0x0432: "tn",
  0x045b: "si",
  0x041b: "sk",
  0x0424: "sl",
  0x2c0a: "es-AR",
  0x400a: "es-BO",
  0x340a: "es-CL",
  0x240a: "es-CO",
  0x140a: "es-CR",
  0x1c0a: "es-DO",
  0x300a: "es-EC",
  0x440a: "es-SV",
  0x100a: "es-GT",
  0x480a: "es-HN",
  0x080a: "es-MX",
  0x4c0a: "es-NI",
  0x180a: "es-PA",
  0x3c0a: "es-PY",
  0x280a: "es-PE",
  0x500a: "es-PR",

  // Microsoft has defined two different language codes for
  // “Spanish with modern sorting” and “Spanish with traditional
  // sorting”. This makes sense for collation APIs, and it would be
  // possible to express this in BCP 47 language tags via Unicode
  // extensions (eg., es-u-co-trad is Spanish with traditional
  // sorting). However, for storing names in fonts, the distinction
  // does not make sense, so we give “es” in both cases.
  0x0c0a: "es",
  0x040a: "es",

  0x540a: "es-US",
  0x380a: "es-UY",
  0x200a: "es-VE",
  0x081d: "sv-FI",
  0x041d: "sv",
  0x045a: "syr",
  0x0428: "tg",
  0x085f: "tzm",
  0x0449: "ta",
  0x0444: "tt",
  0x044a: "te",
  0x041e: "th",
  0x0451: "bo",
  0x041f: "tr",
  0x0442: "tk",
  0x0480: "ug",
  0x0422: "uk",
  0x042e: "hsb",
  0x0420: "ur",
  0x0843: "uz-Cyrl",
  0x0443: "uz",
  0x042a: "vi",
  0x0452: "cy",
  0x0488: "wo",
  0x0485: "sah",
  0x0478: "ii",
  0x046a: "yo"
};
const macLanguageEncodings: ILangMap = {
  15: "x-mac-icelandic", // langIcelandic
  17: "x-mac-turkish", // langTurkish
  18: "x-mac-croatian", // langCroatian
  24: "x-mac-ce", // langLithuanian
  25: "x-mac-ce", // langPolish
  26: "x-mac-ce", // langHungarian
  27: "x-mac-ce", // langEstonian
  28: "x-mac-ce", // langLatvian
  30: "x-mac-icelandic", // langFaroese
  37: "x-mac-romanian", // langRomanian
  38: "x-mac-ce", // langCzech
  39: "x-mac-ce", // langSlovak
  40: "x-mac-ce", // langSlovenian
  143: "x-mac-inuit", // langInuktitut
  146: "x-mac-gaelic" // langIrishGaelicScript
};
const macScriptEncodings: ILangMap = {
  0: "macintosh", // smRoman
  1: "x-mac-japanese", // smJapanese
  2: "x-mac-chinesetrad", // smTradChinese
  3: "x-mac-korean", // smKorean
  6: "x-mac-greek", // smGreek
  7: "x-mac-cyrillic", // smCyrillic
  9: "x-mac-devanagai", // smDevanagari
  10: "x-mac-gurmukhi", // smGurmukhi
  11: "x-mac-gujarati", // smGujarati
  12: "x-mac-oriya", // smOriya
  13: "x-mac-bengali", // smBengali
  14: "x-mac-tamil", // smTamil
  15: "x-mac-telugu", // smTelugu
  16: "x-mac-kannada", // smKannada
  17: "x-mac-malayalam", // smMalayalam
  18: "x-mac-sinhalese", // smSinhalese
  19: "x-mac-burmese", // smBurmese
  20: "x-mac-khmer", // smKhmer
  21: "x-mac-thai", // smThai
  22: "x-mac-lao", // smLao
  23: "x-mac-georgian", // smGeorgian
  24: "x-mac-armenian", // smArmenian
  25: "x-mac-chinesesimp", // smSimpChinese
  26: "x-mac-tibetan", // smTibetan
  27: "x-mac-mongolian", // smMongolian
  28: "x-mac-ethiopic", // smEthiopic
  29: "x-mac-ce", // smCentralEuroRoman
  30: "x-mac-vietnamese", // smVietnamese
  31: "x-mac-extarabic" // smExtArabic
};
const utf16 = "utf-16";
function getLanguageCode(
  platformID: number,
  languageID: number,
  ltag: string[] | null
) {
  switch (platformID) {
    case 0: // Unicode
      if (languageID === 0xffff) {
        return "und";
      } else if (ltag) {
        return ltag[languageID];
      }

      break;

    case 1: // Macintosh
      return macLanguages[languageID];

    case 3: // Windows
      return windowsLanguages[languageID];
  }

  return undefined;
}
function getEncoding(
  platformID: number,
  encodingID: number,
  languageID: number
) {
  switch (platformID) {
    case 0: // Unicode
      return utf16;

    case 1: // Apple Macintosh
      return macLanguageEncodings[languageID] || macScriptEncodings[encodingID];

    case 3: // Microsoft Windows
      if (encodingID === 1 || encodingID === 10) {
        return utf16;
      }

      break;
  }

  return undefined;
}
export function parseNameTable(
  data: Buffer,
  start: number,
  ltag: string[] | null
): INames {
  const name: any = {};
  const p = new Parser(data, start);
  const format = p.parseUShort();
  const count = p.parseUShort();
  const stringOffset = p.offset + p.parseUShort();
  for (let i = 0; i < count; i++) {
    const platformID = p.parseUShort();
    const encodingID = p.parseUShort();
    const languageID = p.parseUShort();
    const nameID = p.parseUShort();
    const property = nameTableNames[nameID] || nameID;
    const byteLength = p.parseUShort();
    const offset = p.parseUShort();
    const language = getLanguageCode(platformID, languageID, ltag);
    const encoding = getEncoding(platformID, encodingID, languageID);
    if (encoding !== undefined && language !== undefined) {
      let text;
      if (encoding === utf16) {
        text = decode.UTF16(data, stringOffset + offset, byteLength);
      } else {
        text = decode.MACSTRING(
          data,
          stringOffset + offset,
          byteLength,
          encoding
        );
      }

      if (text) {
        let translations = name[property];
        if (translations === undefined) {
          translations = name[property] = {};
        }

        translations[language] = text;
      }
    }
  }

  let langTagCount = 0;
  if (format === 1) {
    // FIXME: Also handle Microsoft's 'name' table 1.
    langTagCount = p.parseUShort();
  }

  return name;
}
