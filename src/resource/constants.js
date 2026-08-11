/**
 * @module constants
 * @description Centralized constants for LXRN framework.
 * This module provides all constants used across the framework.
 * @author LXRN (Luxarion)
 * @version 1.0.0
 */

// ===== MATHEMATICAL CONSTANTS =====
export const PI = Math.PI;
export const TWO_PI = Math.PI * 2;
export const HALF_PI = Math.PI / 2;
export const QUARTER_PI = Math.PI / 4;
export const EPSILON = 1e-10;
export const DEG2RAD = Math.PI / 180;
export const RAD2DEG = 180 / Math.PI;
export const E = Math.E;
export const LN2 = Math.LN2;
export const LN10 = Math.LN10;
export const LOG2E = Math.LOG2E;
export const LOG10E = Math.LOG10E;
export const SQRT2 = Math.SQRT2;
export const SQRT1_2 = Math.SQRT1_2;
export const GOLDEN_RATIO = 1.6180339887498948482;
export const PHI = 1.6180339887498948482;
export const TAU = 6.2831853071795864769;

// ===== PHYSICAL CONSTANTS =====
export const GRAVITY = 9.80665;
export const SPEED_OF_LIGHT = 299792458;
export const PLANCK_CONSTANT = 6.62607015e-34;
export const AVOGADRO_CONSTANT = 6.02214076e23;
export const BOLTZMANN_CONSTANT = 1.380649e-23;
export const GAS_CONSTANT = 8.314462618;
export const ELECTRON_CHARGE = 1.602176634e-19;
export const ELECTRON_MASS = 9.1093837015e-31;
export const PROTON_MASS = 1.67262192369e-27;

// ===== ANGLE CONSTANTS =====
export const DEGREES_360 = 360;
export const DEGREES_180 = 180;
export const DEGREES_90 = 90;
export const DEGREES_45 = 45;
export const DEGREES_30 = 30;
export const DEGREES_60 = 60;

// ===== TIME CONSTANTS =====
export const MILLISECONDS_PER_SECOND = 1000;
export const SECONDS_PER_MINUTE = 60;
export const MINUTES_PER_HOUR = 60;
export const HOURS_PER_DAY = 24;
export const DAYS_PER_WEEK = 7;
export const DAYS_PER_YEAR = 365.25;
export const MONTHS_PER_YEAR = 12;

// ===== DATA SIZE CONSTANTS =====
export const KILOBYTE = 1024;
export const MEGABYTE = 1024 * 1024;
export const GIGABYTE = 1024 * 1024 * 1024;
export const TERABYTE = 1024 * 1024 * 1024 * 1024;

// ===== COLOR CONSTANTS (RGB 0-255) =====
export const COLOR_WHITE = { r: 255, g: 255, b: 255, a: 1 };
export const COLOR_BLACK = { r: 0, g: 0, b: 0, a: 1 };
export const COLOR_RED = { r: 255, g: 0, b: 0, a: 1 };
export const COLOR_GREEN = { r: 0, g: 255, b: 0, a: 1 };
export const COLOR_BLUE = { r: 0, g: 0, b: 255, a: 1 };
export const COLOR_YELLOW = { r: 255, g: 255, b: 0, a: 1 };
export const COLOR_CYAN = { r: 0, g: 255, b: 255, a: 1 };
export const COLOR_MAGENTA = { r: 255, g: 0, b: 255, a: 1 };
export const COLOR_ORANGE = { r: 255, g: 165, b: 0, a: 1 };
export const COLOR_PURPLE = { r: 128, g: 0, b: 128, a: 1 };
export const COLOR_PINK = { r: 255, g: 192, b: 203, a: 1 };
export const COLOR_BROWN = { r: 165, g: 42, b: 42, a: 1 };

// ===== HEX COLORS =====
export const HEX_WHITE = '#FFFFFF';
export const HEX_BLACK = '#000000';
export const HEX_RED = '#FF0000';
export const HEX_GREEN = '#00FF00';
export const HEX_BLUE = '#0000FF';
export const HEX_YELLOW = '#FFFF00';
export const HEX_CYAN = '#00FFFF';
export const HEX_MAGENTA = '#FF00FF';
export const HEX_ORANGE = '#FFA500';
export const HEX_PURPLE = '#800080';
export const HEX_PINK = '#FFC0CB';
export const HEX_BROWN = '#A52A2A';

// ===== CSS COLOR NAMES =====
export const CSS_WHITE = 'white';
export const CSS_BLACK = 'black';
export const CSS_RED = 'red';
export const CSS_GREEN = 'green';
export const CSS_BLUE = 'blue';
export const CSS_YELLOW = 'yellow';
export const CSS_CYAN = 'cyan';
export const CSS_MAGENTA = 'magenta';
export const CSS_ORANGE = 'orange';
export const CSS_PURPLE = 'purple';
export const CSS_PINK = 'pink';
export const CSS_BROWN = 'brown';

// ===== MATH LIMITS =====
export const MATH_MAX = Number.MAX_VALUE;
export const MATH_MIN = Number.MIN_VALUE;
export const POSITIVE_INFINITY = Infinity;
export const NEGATIVE_INFINITY = -Infinity;
export const NOT_A_NUMBER = NaN;

// ===== DEFAULT VALUES =====
export const DEFAULT_SEED = 1234567;
export const DEFAULT_EPSILON = 1e-10;
export const DEFAULT_TTL = 60000;
export const DEFAULT_CACHE_SIZE = 100;
export const DEFAULT_MAX_LISTENERS = 10;
export const DEFAULT_MAX_RETRIES = 3;
export const DEFAULT_TIMEOUT = 30000;

// ===== FRAMEWORK CONSTANTS =====
export const FRAMEWORK_NAME = 'LXRN';
export const FRAMEWORK_VERSION = '1.0.0';
export const FRAMEWORK_AUTHOR = 'LXRN (Luxarion)';
export const FRAMEWORK_LICENSE = 'MIT';

// ===== UI CONSTANTS =====
export const UI_PADDING_SMALL = 4;
export const UI_PADDING_MEDIUM = 8;
export const UI_PADDING_LARGE = 16;
export const UI_PADDING_XLARGE = 24;
export const UI_MARGIN_SMALL = 4;
export const UI_MARGIN_MEDIUM = 8;
export const UI_MARGIN_LARGE = 16;
export const UI_MARGIN_XLARGE = 24;
export const UI_FONT_SMALL = 12;
export const UI_FONT_MEDIUM = 14;
export const UI_FONT_LARGE = 16;
export const UI_FONT_XLARGE = 20;
export const UI_BORDER_RADIUS_SMALL = 2;
export const UI_BORDER_RADIUS_MEDIUM = 4;
export const UI_BORDER_RADIUS_LARGE = 8;

// ===== ANIMATION CONSTANTS =====
export const ANIMATION_DURATION_FAST = 200;
export const ANIMATION_DURATION_MEDIUM = 400;
export const ANIMATION_DURATION_SLOW = 600;
export const ANIMATION_EASE_IN_OUT = 'ease-in-out';
export const ANIMATION_EASE_IN = 'ease-in';
export const ANIMATION_EASE_OUT = 'ease-out';
export const ANIMATION_LINEAR = 'linear';

// ===== REGEX PATTERNS =====
export const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const REGEX_URL = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
export const REGEX_PHONE = /^\+?[\d\s-()]+$/;
export const REGEX_NUMERIC = /^-?\d+(\.\d+)?$/;
export const REGEX_INTEGER = /^-?\d+$/;
export const REGEX_FLOAT = /^-?\d+\.\d+$/;
export const REGEX_HEX = /^#?([a-f0-9]{6}|[a-f0-9]{3})$/;
export const REGEX_SLUG = /^[a-z0-9-]+$/;
export const REGEX_ALPHANUMERIC = /^[a-zA-Z0-9]+$/;
export const REGEX_WHITESPACE = /\s/g;
export const REGEX_NON_WORD = /[^\w\s-]/g;
export const REGEX_MULTIPLE_SPACES = /\s+/g;

// ===== MIME TYPES =====
export const MIME_JSON = 'application/json';
export const MIME_XML = 'application/xml';
export const MIME_HTML = 'text/html';
export const MIME_CSS = 'text/css';
export const MIME_JS = 'application/javascript';
export const MIME_PNG = 'image/png';
export const MIME_JPG = 'image/jpeg';
export const MIME_GIF = 'image/gif';
export const MIME_SVG = 'image/svg+xml';
export const MIME_PDF = 'application/pdf';
export const MIME_ZIP = 'application/zip';
export const MIME_MP4 = 'video/mp4';
export const MIME_MP3 = 'audio/mpeg';
export const MIME_WAV = 'audio/wav';
export const MIME_OCTET = 'application/octet-stream';
export const MIME_FORM_DATA = 'multipart/form-data';
export const MIME_URLENCODED = 'application/x-www-form-urlencoded';

// ===== HTTP STATUS CODES =====
export const HTTP_200_OK = 200;
export const HTTP_201_CREATED = 201;
export const HTTP_202_ACCEPTED = 202;
export const HTTP_204_NO_CONTENT = 204;
export const HTTP_301_MOVED = 301;
export const HTTP_302_FOUND = 302;
export const HTTP_304_NOT_MODIFIED = 304;
export const HTTP_400_BAD_REQUEST = 400;
export const HTTP_401_UNAUTHORIZED = 401;
export const HTTP_403_FORBIDDEN = 403;
export const HTTP_404_NOT_FOUND = 404;
export const HTTP_405_METHOD_NOT_ALLOWED = 405;
export const HTTP_408_REQUEST_TIMEOUT = 408;
export const HTTP_409_CONFLICT = 409;
export const HTTP_410_GONE = 410;
export const HTTP_413_PAYLOAD_TOO_LARGE = 413;
export const HTTP_415_UNSUPPORTED_MEDIA = 415;
export const HTTP_429_TOO_MANY_REQUESTS = 429;
export const HTTP_500_INTERNAL_ERROR = 500;
export const HTTP_501_NOT_IMPLEMENTED = 501;
export const HTTP_502_BAD_GATEWAY = 502;
export const HTTP_503_SERVICE_UNAVAILABLE = 503;
export const HTTP_504_GATEWAY_TIMEOUT = 504;

// ===== HTTP METHODS =====
export const HTTP_GET = 'GET';
export const HTTP_POST = 'POST';
export const HTTP_PUT = 'PUT';
export const HTTP_DELETE = 'DELETE';
export const HTTP_PATCH = 'PATCH';
export const HTTP_HEAD = 'HEAD';
export const HTTP_OPTIONS = 'OPTIONS';

// ===== LOG LEVELS =====
export const LOG_LEVEL_DEBUG = 0;
export const LOG_LEVEL_INFO = 1;
export const LOG_LEVEL_WARN = 2;
export const LOG_LEVEL_ERROR = 3;
export const LOG_LEVEL_NONE = 4;

// ===== CACHE STRATEGIES =====
export const CACHE_STRATEGY_LRU = 'lru';
export const CACHE_STRATEGY_TTL = 'ttl';
export const CACHE_STRATEGY_MEMORY = 'memory';
export const CACHE_STRATEGY_PERSISTENT = 'persistent';

// ===== SORT ORDERS =====
export const SORT_ORDER_ASC = 'asc';
export const SORT_ORDER_DESC = 'desc';

// ===== UNITS =====
export const UNIT_PIXELS = 'px';
export const UNIT_PERCENT = '%';
export const UNIT_EM = 'em';
export const UNIT_REM = 'rem';
export const UNIT_VW = 'vw';
export const UNIT_VH = 'vh';
export const UNIT_DEGREES = 'deg';
export const UNIT_RADIANS = 'rad';
export const UNIT_TURNS = 'turn';
export const UNIT_GRADIANS = 'grad';

export const VERSION = '1.0.0';

// ===== RENDER CONSTANTS =====
export const CullFaceNone = 0;
export const CullFaceBack = 1;
export const CullFaceFront = 2;
export const CullFaceFrontBack = 3;

export const FrontSide = 0;
export const BackSide = 1;
export const DoubleSide = 2;

export const NoBlending = 0;
export const NormalBlending = 1;
export const AdditiveBlending = 2;
export const SubtractiveBlending = 3;
export const MultiplyBlending = 4;
export const CustomBlending = 5;
export const MaterialBlending = 6;

export const AddEquation = 100;
export const SubtractEquation = 101;
export const ReverseSubtractEquation = 102;
export const MinEquation = 103;
export const MaxEquation = 104;

export const ZeroFactor = 200;
export const OneFactor = 201;
export const SrcColorFactor = 202;
export const OneMinusSrcColorFactor = 203;
export const SrcAlphaFactor = 204;
export const OneMinusSrcAlphaFactor = 205;
export const DstAlphaFactor = 206;
export const OneMinusDstAlphaFactor = 207;
export const DstColorFactor = 208;
export const OneMinusDstColorFactor = 209;
export const SrcAlphaSaturateFactor = 210;
export const ConstantColorFactor = 211;
export const OneMinusConstantColorFactor = 212;
export const ConstantAlphaFactor = 213;
export const OneMinusConstantAlphaFactor = 214;

// ===== SHADOW MAP =====
export const BasicShadowMap = 0;
export const PCFShadowMap = 1;
export const PCFSoftShadowMap = 2;
export const VSMShadowMap = 3;

// ===== DEPTH =====
export const NeverDepth = 0;
export const AlwaysDepth = 1;
export const LessDepth = 2;
export const LessEqualDepth = 3;
export const EqualDepth = 4;
export const GreaterEqualDepth = 5;
export const GreaterDepth = 6;
export const NotEqualDepth = 7;

// ===== TONE MAPPING =====
export const NoToneMapping = 0;
export const LinearToneMapping = 1;
export const ReinhardToneMapping = 2;
export const CineonToneMapping = 3;
export const ACESFilmicToneMapping = 4;
export const CustomToneMapping = 5;
export const AgXToneMapping = 6;
export const NeutralToneMapping = 7;

// ===== TEXTURE MAPPING =====
export const UVMapping = 300;
export const CubeReflectionMapping = 301;
export const CubeRefractionMapping = 302;
export const EquirectangularReflectionMapping = 303;
export const EquirectangularRefractionMapping = 304;
export const CubeUVReflectionMapping = 306;

// ===== TEXTURE WRAPPING =====
export const RepeatWrapping = 1000;
export const ClampToEdgeWrapping = 1001;
export const MirroredRepeatWrapping = 1002;

// ===== TEXTURE FILTER =====
export const NearestFilter = 1003;
export const NearestMipmapNearestFilter = 1004;
export const NearestMipmapLinearFilter = 1005;
export const LinearFilter = 1006;
export const LinearMipmapNearestFilter = 1007;
export const LinearMipmapLinearFilter = 1008;

// ===== TEXTURE TYPE =====
export const UnsignedByteType = 1009;
export const ByteType = 1010;
export const ShortType = 1011;
export const UnsignedShortType = 1012;
export const IntType = 1013;
export const UnsignedIntType = 1014;
export const FloatType = 1015;
export const HalfFloatType = 1016;
export const UnsignedShort4444Type = 1017;
export const UnsignedShort5551Type = 1018;
export const UnsignedInt248Type = 1020;
export const UnsignedInt5999Type = 35902;
export const UnsignedInt101111Type = 35899;

// ===== TEXTURE FORMAT =====
export const AlphaFormat = 1021;
export const RGBFormat = 1022;
export const RGBAFormat = 1023;
export const DepthFormat = 1026;
export const DepthStencilFormat = 1027;
export const RedFormat = 1028;
export const RedIntegerFormat = 1029;
export const RGFormat = 1030;
export const RGIntegerFormat = 1031;
export const RGBIntegerFormat = 1032;
export const RGBAIntegerFormat = 1033;

// ===== COMPRESSED TEXTURE FORMAT =====
export const RGB_S3TC_DXT1_Format = 33776;
export const RGBA_S3TC_DXT1_Format = 33777;
export const RGBA_S3TC_DXT3_Format = 33778;
export const RGBA_S3TC_DXT5_Format = 33779;
export const RGB_PVRTC_4BPPV1_Format = 35840;
export const RGB_PVRTC_2BPPV1_Format = 35841;
export const RGBA_PVRTC_4BPPV1_Format = 35842;
export const RGBA_PVRTC_2BPPV1_Format = 35843;
export const RGB_ETC1_Format = 36196;
export const RGB_ETC2_Format = 37492;
export const RGBA_ETC2_EAC_Format = 37496;
export const R11_EAC_Format = 37488;
export const SIGNED_R11_EAC_Format = 37489;
export const RG11_EAC_Format = 37490;
export const SIGNED_RG11_EAC_Format = 37491;
export const RGBA_ASTC_4x4_Format = 37808;
export const RGBA_ASTC_5x4_Format = 37809;
export const RGBA_ASTC_5x5_Format = 37810;
export const RGBA_ASTC_6x5_Format = 37811;
export const RGBA_ASTC_6x6_Format = 37812;
export const RGBA_ASTC_8x5_Format = 37813;
export const RGBA_ASTC_8x6_Format = 37814;
export const RGBA_ASTC_8x8_Format = 37815;
export const RGBA_ASTC_10x5_Format = 37816;
export const RGBA_ASTC_10x6_Format = 37817;
export const RGBA_ASTC_10x8_Format = 37818;
export const RGBA_ASTC_10x10_Format = 37819;
export const RGBA_ASTC_12x10_Format = 37820;
export const RGBA_ASTC_12x12_Format = 37821;
export const RGBA_BPTC_Format = 36492;
export const RGB_BPTC_SIGNED_Format = 36494;
export const RGB_BPTC_UNSIGNED_Format = 36495;
export const RED_RGTC1_Format = 36283;
export const SIGNED_RED_RGTC1_Format = 36284;
export const RED_GREEN_RGTC2_Format = 36285;
export const SIGNED_RED_GREEN_RGTC2_Format = 36286;

// ===== COLOR SPACE =====
export const NoColorSpace = '';
export const SRGBColorSpace = 'srgb';
export const LinearSRGBColorSpace = 'srgb-linear';
export const LinearTransfer = 'linear';
export const SRGBTransfer = 'srgb';

// ===== DRAW MODES =====
export const TrianglesDrawMode = 0;
export const TriangleStripDrawMode = 1;
export const TriangleFanDrawMode = 2;

// ===== STENCIL =====
export const ZeroStencilOp = 0;
export const KeepStencilOp = 7680;
export const ReplaceStencilOp = 7681;
export const IncrementStencilOp = 7682;
export const DecrementStencilOp = 7683;
export const IncrementWrapStencilOp = 34055;
export const DecrementWrapStencilOp = 34056;
export const InvertStencilOp = 5386;

export const NeverStencilFunc = 512;
export const LessStencilFunc = 513;
export const EqualStencilFunc = 514;
export const LessEqualStencilFunc = 515;
export const GreaterStencilFunc = 516;
export const NotEqualStencilFunc = 517;
export const GreaterEqualStencilFunc = 518;
export const AlwaysStencilFunc = 519;

// ===== USAGE =====
export const StaticDrawUsage = 35044;
export const DynamicDrawUsage = 35048;
export const StreamDrawUsage = 35040;
export const StaticReadUsage = 35045;
export const DynamicReadUsage = 35049;
export const StreamReadUsage = 35041;
export const StaticCopyUsage = 35046;
export const DynamicCopyUsage = 35050;
export const StreamCopyUsage = 35042;

// ===== INTERPOLATION =====
export const InterpolateDiscrete = 2300;
export const InterpolateLinear = 2301;
export const InterpolateSmooth = 2302;
export const InterpolateBezier = 2303;

// ===== ANIMATION LOOP =====
export const LoopOnce = 2200;
export const LoopRepeat = 2201;
export const LoopPingPong = 2202;

// ===== ANIMATION ENDING =====
export const ZeroCurvatureEnding = 2400;
export const ZeroSlopeEnding = 2401;
export const WrapAroundEnding = 2402;

// ===== ANIMATION BLEND =====
export const NormalAnimationBlendMode = 2500;
export const AdditiveAnimationBlendMode = 2501;

// ===== DEPTH PACKING =====
export const BasicDepthPacking = 3200;
export const RGBADepthPacking = 3201;
export const RGBDepthPacking = 3202;
export const RGDepthPacking = 3203;

// ===== NORMAL MAP =====
export const TangentSpaceNormalMap = 0;
export const ObjectSpaceNormalMap = 1;

// ===== NORMAL PACKING =====
export const NoNormalPacking = '';
export const NormalRGPacking = 'rg';
export const NormalGAPacking = 'ga';

// ===== BIND MODE =====
export const AttachedBindMode = 'attached';
export const DetachedBindMode = 'detached';

// ===== COORDINATE SYSTEM =====
export const WebGLCoordinateSystem = 2000;
export const WebGPUCoordinateSystem = 2001;

// ===== GLSL =====
export const GLSL1 = '100';
export const GLSL3 = '300 es';

// ===== MOUSE / TOUCH =====
export const MOUSE = { LEFT: 0, MIDDLE: 1, RIGHT: 2, ROTATE: 0, DOLLY: 1, PAN: 2 };
export const TOUCH = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 };

// ===== COMPARISON =====
export const NeverCompare = 512;
export const LessCompare = 513;
export const EqualCompare = 514;
export const LessEqualCompare = 515;
export const GreaterCompare = 516;
export const NotEqualCompare = 517;
export const GreaterEqualCompare = 518;
export const AlwaysCompare = 519;

// ===== ENV MAP OPERATION =====
export const MultiplyOperation = 0;
export const MixOperation = 1;
export const AddOperation = 2;

// ===== TIMESTAMP QUERY =====
export const TimestampQuery = {
    COMPUTE: 'compute',
    RENDER: 'render'
};

// ===== INTERPOLATION SAMPLING =====
export const InterpolationSamplingType = {
    PERSPECTIVE: 'perspective',
    LINEAR: 'linear',
    FLAT: 'flat'
};

export const InterpolationSamplingMode = {
    NORMAL: 'normal',
    CENTROID: 'centroid',
    SAMPLE: 'sample',
    FIRST: 'first',
    EITHER: 'either'
};

// ===== COMPATIBILITY =====
export const Compatibility = {
    TEXTURE_COMPARE: 'depthTextureCompare'
};

// ===== RENDER OBJECT REFRESH =====
export const RenderObjectRefreshType = {
    NONE: 0,
    SHARED: 1,
    FULL: 2
};

export const constants = {
    PI,
    TWO_PI,
    HALF_PI,
    QUARTER_PI,
    EPSILON,
    DEG2RAD,
    RAD2DEG,
    E,
    LN2,
    LN10,
    LOG2E,
    LOG10E,
    SQRT2,
    SQRT1_2,
    GOLDEN_RATIO,
    PHI,
    TAU,
    GRAVITY,
    SPEED_OF_LIGHT,
    PLANCK_CONSTANT,
    AVOGADRO_CONSTANT,
    BOLTZMANN_CONSTANT,
    GAS_CONSTANT,
    ELECTRON_CHARGE,
    ELECTRON_MASS,
    PROTON_MASS,
    DEGREES_360,
    DEGREES_180,
    DEGREES_90,
    DEGREES_45,
    DEGREES_30,
    DEGREES_60,
    MILLISECONDS_PER_SECOND,
    SECONDS_PER_MINUTE,
    MINUTES_PER_HOUR,
    HOURS_PER_DAY,
    DAYS_PER_WEEK,
    DAYS_PER_YEAR,
    MONTHS_PER_YEAR,
    KILOBYTE,
    MEGABYTE,
    GIGABYTE,
    TERABYTE,
    COLOR_WHITE,
    COLOR_BLACK,
    COLOR_RED,
    COLOR_GREEN,
    COLOR_BLUE,
    COLOR_YELLOW,
    COLOR_CYAN,
    COLOR_MAGENTA,
    COLOR_ORANGE,
    COLOR_PURPLE,
    COLOR_PINK,
    COLOR_BROWN,
    HEX_WHITE,
    HEX_BLACK,
    HEX_RED,
    HEX_GREEN,
    HEX_BLUE,
    HEX_YELLOW,
    HEX_CYAN,
    HEX_MAGENTA,
    HEX_ORANGE,
    HEX_PURPLE,
    HEX_PINK,
    HEX_BROWN,
    CSS_WHITE,
    CSS_BLACK,
    CSS_RED,
    CSS_GREEN,
    CSS_BLUE,
    CSS_YELLOW,
    CSS_CYAN,
    CSS_MAGENTA,
    CSS_ORANGE,
    CSS_PURPLE,
    CSS_PINK,
    CSS_BROWN,
    MATH_MAX,
    MATH_MIN,
    POSITIVE_INFINITY,
    NEGATIVE_INFINITY,
    NOT_A_NUMBER,
    DEFAULT_SEED,
    DEFAULT_EPSILON,
    DEFAULT_TTL,
    DEFAULT_CACHE_SIZE,
    DEFAULT_MAX_LISTENERS,
    DEFAULT_MAX_RETRIES,
    DEFAULT_TIMEOUT,
    FRAMEWORK_NAME,
    FRAMEWORK_VERSION,
    FRAMEWORK_AUTHOR,
    FRAMEWORK_LICENSE,
    UI_PADDING_SMALL,
    UI_PADDING_MEDIUM,
    UI_PADDING_LARGE,
    UI_PADDING_XLARGE,
    UI_MARGIN_SMALL,
    UI_MARGIN_MEDIUM,
    UI_MARGIN_LARGE,
    UI_MARGIN_XLARGE,
    UI_FONT_SMALL,
    UI_FONT_MEDIUM,
    UI_FONT_LARGE,
    UI_FONT_XLARGE,
    UI_BORDER_RADIUS_SMALL,
    UI_BORDER_RADIUS_MEDIUM,
    UI_BORDER_RADIUS_LARGE,
    ANIMATION_DURATION_FAST,
    ANIMATION_DURATION_MEDIUM,
    ANIMATION_DURATION_SLOW,
    ANIMATION_EASE_IN_OUT,
    ANIMATION_EASE_IN,
    ANIMATION_EASE_OUT,
    ANIMATION_LINEAR,
    REGEX_EMAIL,
    REGEX_URL,
    REGEX_PHONE,
    REGEX_NUMERIC,
    REGEX_INTEGER,
    REGEX_FLOAT,
    REGEX_HEX,
    REGEX_SLUG,
    REGEX_ALPHANUMERIC,
    REGEX_WHITESPACE,
    REGEX_NON_WORD,
    REGEX_MULTIPLE_SPACES,
    MIME_JSON,
    MIME_XML,
    MIME_HTML,
    MIME_CSS,
    MIME_JS,
    MIME_PNG,
    MIME_JPG,
    MIME_GIF,
    MIME_SVG,
    MIME_PDF,
    MIME_ZIP,
    MIME_MP4,
    MIME_MP3,
    MIME_WAV,
    MIME_OCTET,
    MIME_FORM_DATA,
    MIME_URLENCODED,
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_202_ACCEPTED,
    HTTP_204_NO_CONTENT,
    HTTP_301_MOVED,
    HTTP_302_FOUND,
    HTTP_304_NOT_MODIFIED,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
    HTTP_403_FORBIDDEN,
    HTTP_404_NOT_FOUND,
    HTTP_405_METHOD_NOT_ALLOWED,
    HTTP_408_REQUEST_TIMEOUT,
    HTTP_409_CONFLICT,
    HTTP_410_GONE,
    HTTP_413_PAYLOAD_TOO_LARGE,
    HTTP_415_UNSUPPORTED_MEDIA,
    HTTP_429_TOO_MANY_REQUESTS,
    HTTP_500_INTERNAL_ERROR,
    HTTP_501_NOT_IMPLEMENTED,
    HTTP_502_BAD_GATEWAY,
    HTTP_503_SERVICE_UNAVAILABLE,
    HTTP_504_GATEWAY_TIMEOUT,
    HTTP_GET,
    HTTP_POST,
    HTTP_PUT,
    HTTP_DELETE,
    HTTP_PATCH,
    HTTP_HEAD,
    HTTP_OPTIONS,
    LOG_LEVEL_DEBUG,
    LOG_LEVEL_INFO,
    LOG_LEVEL_WARN,
    LOG_LEVEL_ERROR,
    LOG_LEVEL_NONE,
    CACHE_STRATEGY_LRU,
    CACHE_STRATEGY_TTL,
    CACHE_STRATEGY_MEMORY,
    CACHE_STRATEGY_PERSISTENT,
    SORT_ORDER_ASC,
    SORT_ORDER_DESC,
    UNIT_PIXELS,
    UNIT_PERCENT,
    UNIT_EM,
    UNIT_REM,
    UNIT_VW,
    UNIT_VH,
    UNIT_DEGREES,
    UNIT_RADIANS,
    UNIT_TURNS,
    UNIT_GRADIANS,
    VERSION,
    CullFaceNone,
    CullFaceBack,
    CullFaceFront,
    CullFaceFrontBack,
    FrontSide,
    BackSide,
    DoubleSide,
    NoBlending,
    NormalBlending,
    AdditiveBlending,
    SubtractiveBlending,
    MultiplyBlending,
    CustomBlending,
    MaterialBlending,
    AddEquation,
    SubtractEquation,
    ReverseSubtractEquation,
    MinEquation,
    MaxEquation,
    ZeroFactor,
    OneFactor,
    SrcColorFactor,
    OneMinusSrcColorFactor,
    SrcAlphaFactor,
    OneMinusSrcAlphaFactor,
    DstAlphaFactor,
    OneMinusDstAlphaFactor,
    DstColorFactor,
    OneMinusDstColorFactor,
    SrcAlphaSaturateFactor,
    ConstantColorFactor,
    OneMinusConstantColorFactor,
    ConstantAlphaFactor,
    OneMinusConstantAlphaFactor,
    BasicShadowMap,
    PCFShadowMap,
    PCFSoftShadowMap,
    VSMShadowMap,
    NeverDepth,
    AlwaysDepth,
    LessDepth,
    LessEqualDepth,
    EqualDepth,
    GreaterEqualDepth,
    GreaterDepth,
    NotEqualDepth,
    NoToneMapping,
    LinearToneMapping,
    ReinhardToneMapping,
    CineonToneMapping,
    ACESFilmicToneMapping,
    CustomToneMapping,
    AgXToneMapping,
    NeutralToneMapping,
    UVMapping,
    CubeReflectionMapping,
    CubeRefractionMapping,
    EquirectangularReflectionMapping,
    EquirectangularRefractionMapping,
    CubeUVReflectionMapping,
    RepeatWrapping,
    ClampToEdgeWrapping,
    MirroredRepeatWrapping,
    NearestFilter,
    NearestMipmapNearestFilter,
    NearestMipmapLinearFilter,
    LinearFilter,
    LinearMipmapNearestFilter,
    LinearMipmapLinearFilter,
    UnsignedByteType,
    ByteType,
    ShortType,
    UnsignedShortType,
    IntType,
    UnsignedIntType,
    FloatType,
    HalfFloatType,
    UnsignedShort4444Type,
    UnsignedShort5551Type,
    UnsignedInt248Type,
    UnsignedInt5999Type,
    UnsignedInt101111Type,
    AlphaFormat,
    RGBFormat,
    RGBAFormat,
    DepthFormat,
    DepthStencilFormat,
    RedFormat,
    RedIntegerFormat,
    RGFormat,
    RGIntegerFormat,
    RGBIntegerFormat,
    RGBAIntegerFormat,
    RGB_S3TC_DXT1_Format,
    RGBA_S3TC_DXT1_Format,
    RGBA_S3TC_DXT3_Format,
    RGBA_S3TC_DXT5_Format,
    RGB_PVRTC_4BPPV1_Format,
    RGB_PVRTC_2BPPV1_Format,
    RGBA_PVRTC_4BPPV1_Format,
    RGBA_PVRTC_2BPPV1_Format,
    RGB_ETC1_Format,
    RGB_ETC2_Format,
    RGBA_ETC2_EAC_Format,
    R11_EAC_Format,
    SIGNED_R11_EAC_Format,
    RG11_EAC_Format,
    SIGNED_RG11_EAC_Format,
    RGBA_ASTC_4x4_Format,
    RGBA_ASTC_5x4_Format,
    RGBA_ASTC_5x5_Format,
    RGBA_ASTC_6x5_Format,
    RGBA_ASTC_6x6_Format,
    RGBA_ASTC_8x5_Format,
    RGBA_ASTC_8x6_Format,
    RGBA_ASTC_8x8_Format,
    RGBA_ASTC_10x5_Format,
    RGBA_ASTC_10x6_Format,
    RGBA_ASTC_10x8_Format,
    RGBA_ASTC_10x10_Format,
    RGBA_ASTC_12x10_Format,
    RGBA_ASTC_12x12_Format,
    RGBA_BPTC_Format,
    RGB_BPTC_SIGNED_Format,
    RGB_BPTC_UNSIGNED_Format,
    RED_RGTC1_Format,
    SIGNED_RED_RGTC1_Format,
    RED_GREEN_RGTC2_Format,
    SIGNED_RED_GREEN_RGTC2_Format,
    NoColorSpace,
    SRGBColorSpace,
    LinearSRGBColorSpace,
    LinearTransfer,
    SRGBTransfer,
    TrianglesDrawMode,
    TriangleStripDrawMode,
    TriangleFanDrawMode,
    ZeroStencilOp,
    KeepStencilOp,
    ReplaceStencilOp,
    IncrementStencilOp,
    DecrementStencilOp,
    IncrementWrapStencilOp,
    DecrementWrapStencilOp,
    InvertStencilOp,
    NeverStencilFunc,
    LessStencilFunc,
    EqualStencilFunc,
    LessEqualStencilFunc,
    GreaterStencilFunc,
    NotEqualStencilFunc,
    GreaterEqualStencilFunc,
    AlwaysStencilFunc,
    StaticDrawUsage,
    DynamicDrawUsage,
    StreamDrawUsage,
    StaticReadUsage,
    DynamicReadUsage,
    StreamReadUsage,
    StaticCopyUsage,
    DynamicCopyUsage,
    StreamCopyUsage,
    InterpolateDiscrete,
    InterpolateLinear,
    InterpolateSmooth,
    InterpolateBezier,
    LoopOnce,
    LoopRepeat,
    LoopPingPong,
    ZeroCurvatureEnding,
    ZeroSlopeEnding,
    WrapAroundEnding,
    NormalAnimationBlendMode,
    AdditiveAnimationBlendMode,
    BasicDepthPacking,
    RGBADepthPacking,
    RGBDepthPacking,
    RGDepthPacking,
    TangentSpaceNormalMap,
    ObjectSpaceNormalMap,
    NoNormalPacking,
    NormalRGPacking,
    NormalGAPacking,
    AttachedBindMode,
    DetachedBindMode,
    WebGLCoordinateSystem,
    WebGPUCoordinateSystem,
    GLSL1,
    GLSL3,
    MOUSE,
    TOUCH,
    NeverCompare,
    LessCompare,
    EqualCompare,
    LessEqualCompare,
    GreaterCompare,
    NotEqualCompare,
    GreaterEqualCompare,
    AlwaysCompare,
    MultiplyOperation,
    MixOperation,
    AddOperation,
    TimestampQuery,
    InterpolationSamplingType,
    InterpolationSamplingMode,
    Compatibility,
    RenderObjectRefreshType
};

export default constants;
