//  https://github.com/SeanGephardt1/seangephardtcom/graphs/commit-activity
//  https://api.github.com/repos/SeanGephardt1/seangephardtcom/commits
//  https://github.com/javascript-tutorial/en.javascript.info
//  https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits
//  let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
//  https://api.publicapis.org/entries

let i = 0;
let _timer = undefined;
let _cached_data = undefined;

const _temp_data = {
  count: 107,
  entries: [
    {
      API: 'AdoptAPet',
      Description: 'Resource to help get pets adopted',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://www.adoptapet.com/public/apis/pet_list.html',
      Category: 'Animals'
    },
    {
      API: 'Axolotl',
      Description: 'Collection of axolotl pictures and facts',
      Auth: '',
      HTTPS: true,
      Cors: 'no',
      Link: 'https://theaxolotlapi.netlify.app/',
      Category: 'Animals'
    },
    {
      API: 'Cat Facts',
      Description: 'Daily cat facts',
      Auth: '',
      HTTPS: true,
      Cors: 'no',
      Link: 'https://alexwohlbruck.github.io/cat-facts/',
      Category: 'Animals'
    },
    {
      API: 'Cataas',
      Description: 'Cat as a service (cats pictures and gifs)',
      Auth: '',
      HTTPS: true,
      Cors: 'no',
      Link: 'https://cataas.com/',
      Category: 'Animals'
    },
    {
      API: 'Cats',
      Description: 'Pictures of cats from Tumblr',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'no',
      Link: 'https://docs.thecatapi.com/',
      Category: 'Animals'
    },
    {
      API: 'Dog Facts',
      Description: 'Random dog facts',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://dukengn.github.io/Dog-facts-API/',
      Category: 'Animals'
    },
    {
      API: 'Dog Facts',
      Description: 'Random facts of Dogs',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://kinduff.github.io/dog-api/',
      Category: 'Animals'
    },
    {
      API: 'Dogs',
      Description: 'Based on the Stanford Dogs Dataset',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://dog.ceo/dog-api/',
      Category: 'Animals'
    },
    {
      API: 'eBird',
      Description:
        'Retrieve recent or notable birding observations within a region',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'no',
      Link: 'https://documenter.getpostman.com/view/664302/S1ENwy59',
      Category: 'Animals'
    },
    {
      API: 'FishWatch',
      Description: 'Information and pictures about individual fish species',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://www.fishwatch.gov/developers',
      Category: 'Animals'
    },
    {
      API: 'HTTP Cat',
      Description: 'Cat for every HTTP Status',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://http.cat/',
      Category: 'Animals'
    },
    {
      API: 'HTTP Dog',
      Description: 'Dogs for every HTTP response status code',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://http.dog/',
      Category: 'Animals'
    },
    {
      API: 'IUCN',
      Description: 'IUCN Red List of Threatened Species',
      Auth: 'apiKey',
      HTTPS: false,
      Cors: 'no',
      Link: 'http://apiv3.iucnredlist.org/api/v3/docs',
      Category: 'Animals'
    },
    {
      API: 'MeowFacts',
      Description: 'Get random cat facts',
      Auth: '',
      HTTPS: true,
      Cors: 'no',
      Link: 'https://github.com/wh-iterabb-it/meowfacts',
      Category: 'Animals'
    },
    {
      API: 'Movebank',
      Description: 'Movement and Migration data of animals',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://github.com/movebank/movebank-api-doc',
      Category: 'Animals'
    },
    {
      API: 'Petfinder',
      Description:
        'Petfinder is dedicated to helping pets find homes, another resource to get pets adopted',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://www.petfinder.com/developers/',
      Category: 'Animals'
    },
    {
      API: 'PlaceBear',
      Description: 'Placeholder bear pictures',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://placebear.com/',
      Category: 'Animals'
    },
    {
      API: 'PlaceDog',
      Description: 'Placeholder Dog pictures',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://place.dog',
      Category: 'Animals'
    },
    {
      API: 'PlaceKitten',
      Description: 'Placeholder Kitten pictures',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://placekitten.com/',
      Category: 'Animals'
    },
    {
      API: 'RandomDog',
      Description: 'Random pictures of dogs',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://random.dog/woof.json',
      Category: 'Animals'
    },
    {
      API: 'RandomDuck',
      Description: 'Random pictures of ducks',
      Auth: '',
      HTTPS: true,
      Cors: 'no',
      Link: 'https://random-d.uk/api',
      Category: 'Animals'
    },
    {
      API: 'RandomFox',
      Description: 'Random pictures of foxes',
      Auth: '',
      HTTPS: true,
      Cors: 'no',
      Link: 'https://randomfox.ca/floof/',
      Category: 'Animals'
    },
    {
      API: 'RescueGroups',
      Description: 'Adoption',
      Auth: '',
      HTTPS: true,
      Cors: 'unknown',
      Link:
        'https://userguide.rescuegroups.org/display/APIDG/API+Developers+Guide+Home',
      Category: 'Animals'
    },
    {
      API: 'Shibe.Online',
      Description: 'Random pictures of Shiba Inu, cats or birds',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'http://shibe.online/',
      Category: 'Animals'
    },
    {
      API: 'The Dog',
      Description:
        'A public service all about Dogs, free to use when making your fancy new App, Website or Service',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'no',
      Link: 'https://thedogapi.com/',
      Category: 'Animals'
    },
    {
      API: 'xeno-canto',
      Description: 'Bird recordings',
      Auth: '',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://xeno-canto.org/explore/api',
      Category: 'Animals'
    },
    {
      API: 'Zoo Animals',
      Description: 'Facts and pictures of zoo animals',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://zoo-animal-api.herokuapp.com/',
      Category: 'Animals'
    },
    {
      API: 'AniAPI',
      Description: 'Anime discovery, streaming & syncing with trackers',
      Auth: 'OAuth',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://aniapi.com/docs/',
      Category: 'Anime'
    },
    {
      API: 'AniDB',
      Description: 'Anime Database',
      Auth: 'apiKey',
      HTTPS: false,
      Cors: 'unknown',
      Link: 'https://wiki.anidb.net/HTTP_API_Definition',
      Category: 'Anime'
    },
    {
      API: 'AniList',
      Description: 'Anime discovery & tracking',
      Auth: 'OAuth',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://github.com/AniList/ApiV2-GraphQL-Docs',
      Category: 'Anime'
    },
    {
      API: 'AnimeChan',
      Description: 'Anime quotes (over 10k+)',
      Auth: '',
      HTTPS: true,
      Cors: 'no',
      Link: 'https://github.com/RocktimSaikia/anime-chan',
      Category: 'Anime'
    },
    {
      API: 'AnimeFacts',
      Description: 'Anime Facts (over 100+)',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://chandan-02.github.io/anime-facts-rest-api/',
      Category: 'Anime'
    },
    {
      API: 'AnimeNewsNetwork',
      Description: 'Anime industry news',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://www.animenewsnetwork.com/encyclopedia/api.php',
      Category: 'Anime'
    },
    {
      API: 'Catboy',
      Description: 'Neko images, funny GIFs & more',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://catboys.com/api',
      Category: 'Anime'
    },
    {
      API: 'Danbooru Anime',
      Description: 'Thousands of anime artist database to find good anime art',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://danbooru.donmai.us/wiki_pages/help:api',
      Category: 'Anime'
    },
    {
      API: 'Jikan',
      Description: 'Unofficial MyAnimeList API',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://jikan.moe',
      Category: 'Anime'
    },
    {
      API: 'Kitsu',
      Description: 'Anime discovery platform',
      Auth: 'OAuth',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://kitsu.docs.apiary.io/',
      Category: 'Anime'
    },
    {
      API: 'MangaDex',
      Description: 'Manga Database and Community',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://api.mangadex.org/docs.html',
      Category: 'Anime'
    },
    {
      API: 'Mangapi',
      Description: 'Translate manga pages from one language to another',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://rapidapi.com/pierre.carcellermeunier/api/mangapi3/',
      Category: 'Anime'
    },
    {
      API: 'MyAnimeList',
      Description: 'Anime and Manga Database and Community',
      Auth: 'OAuth',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://myanimelist.net/clubs.php?cid=13727',
      Category: 'Anime'
    },
    {
      API: 'NekosBest',
      Description: 'Neko Images & Anime roleplaying GIFs',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://docs.nekos.best',
      Category: 'Anime'
    },
    {
      API: 'Shikimori',
      Description: 'Anime discovery, tracking, forum, rates',
      Auth: 'OAuth',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://shikimori.one/api/doc',
      Category: 'Anime'
    },
    {
      API: 'Studio Ghibli',
      Description: 'Resources from Studio Ghibli films',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://ghibliapi.herokuapp.com',
      Category: 'Anime'
    },
    {
      API: 'Trace Moe',
      Description:
        'A useful tool to get the exact scene of an anime from a screenshot',
      Auth: '',
      HTTPS: true,
      Cors: 'no',
      Link: 'https://soruly.github.io/trace.moe-api/#/',
      Category: 'Anime'
    },
    {
      API: 'Waifu.im',
      Description:
        'Get waifu pictures from an archive of over 4000 images and multiple tags',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://waifu.im/docs',
      Category: 'Anime'
    },
    {
      API: 'Waifu.pics',
      Description: 'Image sharing platform for anime images',
      Auth: '',
      HTTPS: true,
      Cors: 'no',
      Link: 'https://waifu.pics/docs',
      Category: 'Anime'
    },
    {
      API: 'AbuseIPDB',
      Description: 'IP/domain/URL reputation',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://docs.abuseipdb.com/',
      Category: 'Anti-Malware'
    },
    {
      API: 'AlienVault Open Threat Exchange (OTX)',
      Description: 'IP/domain/URL reputation',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://otx.alienvault.com/api',
      Category: 'Anti-Malware'
    },
    {
      API: 'CAPEsandbox',
      Description: 'Malware execution and analysis',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://capev2.readthedocs.io/en/latest/usage/api.html',
      Category: 'Anti-Malware'
    },
    {
      API: 'Google Safe Browsing',
      Description: 'Google Link/Domain Flagging',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://developers.google.com/safe-browsing/',
      Category: 'Anti-Malware'
    },
    {
      API: 'MalDatabase',
      Description: 'Provide malware datasets and threat intelligence feeds',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://maldatabase.com/api-doc.html',
      Category: 'Anti-Malware'
    },
    {
      API: 'MalShare',
      Description: 'Malware Archive / file sourcing',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'no',
      Link: 'https://malshare.com/doc.php',
      Category: 'Anti-Malware'
    },
    {
      API: 'MalwareBazaar',
      Description: 'Collect and share malware samples',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://bazaar.abuse.ch/api/',
      Category: 'Anti-Malware'
    },
    {
      API: 'Metacert',
      Description: 'Metacert Link Flagging',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://metacert.com/',
      Category: 'Anti-Malware'
    },
    {
      API: 'NoPhishy',
      Description: "Check links to see if they're known phishing attempts",
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://rapidapi.com/Amiichu/api/exerra-phishing-check/',
      Category: 'Anti-Malware'
    },
    {
      API: 'Phisherman',
      Description: 'IP/domain/URL reputation',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://phisherman.gg/',
      Category: 'Anti-Malware'
    },
    {
      API: 'Scanii',
      Description:
        'Simple REST API that can scan submitted documents/files for the presence of threats',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://docs.scanii.com/',
      Category: 'Anti-Malware'
    },
    {
      API: 'URLhaus',
      Description: 'Bulk queries and Download Malware Samples',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://urlhaus-api.abuse.ch/',
      Category: 'Anti-Malware'
    },
    {
      API: 'URLScan.io',
      Description: 'Scan and Analyse URLs',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://urlscan.io/about-api/',
      Category: 'Anti-Malware'
    },
    {
      API: 'VirusTotal',
      Description: 'VirusTotal File/URL Analysis',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://www.virustotal.com/en/documentation/public-api/',
      Category: 'Anti-Malware'
    },
    {
      API: 'Web of Trust',
      Description: 'IP/domain/URL reputation',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://support.mywot.com/hc/en-us/sections/360004477734-API-',
      Category: 'Anti-Malware'
    },
    {
      API: 'Amethyste',
      Description: 'Generate images for Discord users',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://api.amethyste.moe/',
      Category: 'Art & Design'
    },
    {
      API: 'Art Institute of Chicago',
      Description: 'Art',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://api.artic.edu/docs/',
      Category: 'Art & Design'
    },
    {
      API: 'Colormind',
      Description: 'Color scheme generator',
      Auth: '',
      HTTPS: false,
      Cors: 'unknown',
      Link: 'http://colormind.io/api-access/',
      Category: 'Art & Design'
    },
    {
      API: 'ColourLovers',
      Description: 'Get various patterns, palettes and images',
      Auth: '',
      HTTPS: false,
      Cors: 'unknown',
      Link: 'http://www.colourlovers.com/api',
      Category: 'Art & Design'
    },
    {
      API: 'Cooper Hewitt',
      Description: 'Smithsonian Design Museum',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://collection.cooperhewitt.org/api',
      Category: 'Art & Design'
    },
    {
      API: 'Dribbble',
      Description: 'Discover the world’s top designers & creatives',
      Auth: 'OAuth',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://developer.dribbble.com',
      Category: 'Art & Design'
    },
    {
      API: 'EmojiHub',
      Description: 'Get emojis by categories and groups',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://github.com/cheatsnake/emojihub',
      Category: 'Art & Design'
    },
    {
      API: 'Europeana',
      Description: 'European Museum and Galleries content',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://pro.europeana.eu/resources/apis/search',
      Category: 'Art & Design'
    },
    {
      API: 'Harvard Art Museums',
      Description: 'Art',
      Auth: 'apiKey',
      HTTPS: false,
      Cors: 'unknown',
      Link: 'https://github.com/harvardartmuseums/api-docs',
      Category: 'Art & Design'
    },
    {
      API: 'Icon Horse',
      Description: 'Favicons for any website, with fallbacks',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://icon.horse',
      Category: 'Art & Design'
    },
    {
      API: 'Iconfinder',
      Description: 'Icons',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://developer.iconfinder.com',
      Category: 'Art & Design'
    },
    {
      API: 'Icons8',
      Description: 'Icons (find "search icon" hyperlink in page)',
      Auth: '',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://img.icons8.com/',
      Category: 'Art & Design'
    },
    {
      API: 'Lordicon',
      Description: 'Icons with predone Animations',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://lordicon.com/',
      Category: 'Art & Design'
    },
    {
      API: 'Metropolitan Museum of Art',
      Description: 'Met Museum of Art',
      Auth: '',
      HTTPS: true,
      Cors: 'no',
      Link: 'https://metmuseum.github.io/',
      Category: 'Art & Design'
    },
    {
      API: 'Noun Project',
      Description: 'Icons',
      Auth: 'OAuth',
      HTTPS: false,
      Cors: 'unknown',
      Link: 'http://api.thenounproject.com/index.html',
      Category: 'Art & Design'
    },
    {
      API: 'PHP-Noise',
      Description: 'Noise Background Image Generator',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://php-noise.com/',
      Category: 'Art & Design'
    },
    {
      API: 'Pixel Encounter',
      Description: 'SVG Icon Generator',
      Auth: '',
      HTTPS: true,
      Cors: 'no',
      Link: 'https://pixelencounter.com/api',
      Category: 'Art & Design'
    },
    {
      API: 'Rijksmuseum',
      Description: 'RijksMuseum Data',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://data.rijksmuseum.nl/object-metadata/api/',
      Category: 'Art & Design'
    },
    {
      API: 'Word Cloud',
      Description: 'Easily create word clouds',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://wordcloudapi.com/',
      Category: 'Art & Design'
    },
    {
      API: 'xColors',
      Description: 'Generate & convert colors',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://x-colors.herokuapp.com/',
      Category: 'Art & Design'
    },
    {
      API: 'Auth0',
      Description:
        'Easy to implement, adaptable authentication and authorization platform',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://auth0.com',
      Category: 'Authentication & Authorization'
    },
    {
      API: 'GetOTP',
      Description: 'Implement OTP flow quickly',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'no',
      Link: 'https://otp.dev/en/docs/',
      Category: 'Authentication & Authorization'
    },
    {
      API: 'Micro User Service',
      Description: 'User management and authentication',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'no',
      Link: 'https://m3o.com/user',
      Category: 'Authentication & Authorization'
    },
    {
      API: 'MojoAuth',
      Description: 'Secure and modern passwordless authentication platform',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://mojoauth.com',
      Category: 'Authentication & Authorization'
    },
    {
      API: 'SAWO Labs',
      Description:
        'Simplify login and improve user experience by integrating passwordless authentication in your app',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://sawolabs.com',
      Category: 'Authentication & Authorization'
    },
    {
      API: 'Stytch',
      Description: 'User infrastructure for modern applications',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'no',
      Link: 'https://stytch.com/',
      Category: 'Authentication & Authorization'
    },
    {
      API: 'Warrant',
      Description: 'APIs for authorization and access control',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://warrant.dev/',
      Category: 'Authentication & Authorization'
    },
    {
      API: 'Bitquery',
      Description: 'Onchain GraphQL APIs & DEX APIs',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://graphql.bitquery.io/ide',
      Category: 'Blockchain'
    },
    {
      API: 'Chainlink',
      Description: 'Build hybrid smart contracts with Chainlink',
      Auth: '',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://chain.link/developer-resources',
      Category: 'Blockchain'
    },
    {
      API: 'Chainpoint',
      Description:
        'Chainpoint is a global network for anchoring data to the Bitcoin blockchain',
      Auth: '',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://tierion.com/chainpoint/',
      Category: 'Blockchain'
    },
    {
      API: 'Covalent',
      Description: 'Multi-blockchain data aggregator platform',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://www.covalenthq.com/docs/api/',
      Category: 'Blockchain'
    },
    {
      API: 'Etherscan',
      Description: 'Ethereum explorer API',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://etherscan.io/apis',
      Category: 'Blockchain'
    },
    {
      API: 'Helium',
      Description:
        'Helium is a global, distributed network of Hotspots that create public, long-range wireless coverage',
      Auth: '',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://docs.helium.com/api/blockchain/introduction/',
      Category: 'Blockchain'
    },
    {
      API: 'Nownodes',
      Description:
        'Blockchain-as-a-service solution that provides high-quality connection via API',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://nownodes.io/',
      Category: 'Blockchain'
    },
    {
      API: 'Steem',
      Description: 'Blockchain-based blogging and social media website',
      Auth: '',
      HTTPS: false,
      Cors: 'no',
      Link: 'https://developers.steem.io/',
      Category: 'Blockchain'
    },
    {
      API: 'The Graph',
      Description:
        'Indexing protocol for querying networks like Ethereum with GraphQL',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://thegraph.com',
      Category: 'Blockchain'
    },
    {
      API: 'Walltime',
      Description: "To retrieve Walltime's market info",
      Auth: '',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://walltime.info/api.html',
      Category: 'Blockchain'
    },
    {
      API: 'Watchdata',
      Description:
        'Provide simple and reliable API access to Ethereum blockchain',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://docs.watchdata.io',
      Category: 'Blockchain'
    },
    {
      API: 'A Biblia Digital',
      Description:
        'Do not worry about managing the multiple versions of the Bible',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'no',
      Link: 'https://www.abibliadigital.com.br/en',
      Category: 'Books'
    },
    {
      API: 'Bhagavad Gita',
      Description:
        'Open Source Shrimad Bhagavad Gita API including 21+ authors translation in Sanskrit/English/Hindi',
      Auth: 'apiKey',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://docs.bhagavadgitaapi.in',
      Category: 'Books'
    },
    {
      API: 'Bhagavad Gita',
      Description: 'Bhagavad Gita text',
      Auth: 'OAuth',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://bhagavadgita.io/api',
      Category: 'Books'
    },
    {
      API: 'Bhagavad Gita telugu',
      Description: 'Bhagavad Gita API in telugu and odia languages',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://gita-api.vercel.app',
      Category: 'Books'
    },
    {
      API: 'Bible-api',
      Description: 'Free Bible API with multiple languages',
      Auth: '',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://bible-api.com/',
      Category: 'Books'
    },
    {
      API: 'British National Bibliography',
      Description: 'Books',
      Auth: '',
      HTTPS: false,
      Cors: 'unknown',
      Link: 'http://bnb.data.bl.uk/',
      Category: 'Books'
    },
    {
      API: 'Crossref Metadata Search',
      Description: 'Books & Articles Metadata',
      Auth: '',
      HTTPS: true,
      Cors: 'unknown',
      Link: 'https://github.com/CrossRef/rest-api-doc',
      Category: 'Books'
    },
    {
      API: 'Ganjoor',
      Description:
        'Classic Persian poetry works including access to related manuscripts, recitations and music tracks',
      Auth: 'OAuth',
      HTTPS: true,
      Cors: 'yes',
      Link: 'https://api.ganjoor.net',
      Category: 'Books'
    },
  ]
};

class QuickCountMessage
{
  constructor ( id, idx, d, data, tot )
  {
    this.id = id || -1;
    this.index = idx || 0;
    this.date = d || null;
    this.data = data || "NO DATA";
    this.total = tot;
  }
};

function QuickCount( data )
{ //  console.debug( "worker.js::Count(data)", i, data );
  if ( i < data.total )
  {
    let _m = new QuickCountMessage(
      Math.round( Math.random() * 10000 ),
      i + 1,
      new Date().toISOString(),
      "Demo Worker Message # " + ( i + 1 ) + " : " + data.id + " : " + data.data,
      data.total );

    const message = {
      action: data.action,
      data: _m
    };
    postMessage( message );
  }
  else
  {
    const message = {
      action: data.action,
      data: "STOPPED"
    };
    postMessage( message );
    clearInterval( _timer );
    _timer = undefined;
  }

  i++;
  return;
};

async function FetchAPIData( _msg )
{ 
  //  console.debug( 'db-demo-worker.js::FetchAPIData()', _cached_data );

  //  READ RESPONSE BODY AND PARSE AS JSON
  const _url = "https://api.publicapis.org/entries";
  let _resp = undefined;
  let _commits = undefined;

  if ( _cached_data === undefined )
  {
    _resp = await fetch( _url );
    _commits = await _resp.json();
    //  let _commits = { ..._temp_data };
    _commits.entries.sort( ( a, b ) =>
    {
      let _rv = 0;

      if ( a.API.toLowerCase() < b.API.toLowerCase() )
      {
        _rv = -1;
      }
      else if ( a.API.toLowerCase() > b.API.toLowerCase() )
      {
        _rv = 1;
      }
      else if ( a.API.toLowerCase() === b.API.toLowerCase() )
      {
        _rv = 0;
      }

      //  console.debug( _rv );
      return _rv;
    } );

    _cached_data = { ..._commits };
    console.debug( "FETCHED", _commits.count, _cached_data.count );
  }
  else
  {
    _commits = _cached_data;
    console.debug( "CACHED", _commits.count );
  }

  let _page_start = undefined;  //  msg.page + msg.count
  let _page_end = _page_start + _msg.count;
  let _max_page = Math.ceil( _commits.count / _msg.count ) ;

  //console.debug( "entries total", _commits.entries.length );
  //console.debug( "page count", _msg.count );
  //console.debug( "page index", _msg.page );
  //console.debug( "total pages",_max_page  );

  if ( _msg.page > _max_page || _msg.page < 1)
  { // 
    console.debug( "OVER PAGED" )
    _page_start = 0;
    _page_end = 0;
  }
  else if ( _msg.page === 1 )
  {
    _page_start = 0;
    _page_end = _msg.count;
  }
  else if ( _msg.page > 1 )
  {
    _page_start = ( _msg.page - 1 ) * _msg.count;
    _page_end = _page_start + _msg.count;
  }

  //console.debug( '_page_start', _page_start );
  //console.debug( '_page_end', _page_end );

  let _paged_results = _commits.entries.slice( _page_start, _page_end );
  //  console.debug( '_paged_results', _paged_results );

  let message = {
    action: "apis",
    apiUri: _url,
    total: _commits.count,
    pageCount: _max_page,
    entries: _paged_results
  };

  postMessage( message );
  return;
};

this._default_message = function ( e )
{
  console.debug( "this.defaultMessage", e );

  let message = {
    action: "DEFAULT",
    data: "UNSUPPORTED WORKER ACTION"
  }

  postMessage( message );
  return;
};

this.onmessage = function ( e )
{ //  console.debug( 'WORKER MESSAGE::', e.data.action );
  switch ( e.data.action )
  {
    case "apis": {
      this.FetchAPIData( e.data );
      break;
    }
    case "quickListStart": {
      i = 0;
      clearInterval( _timer );
      _timer = undefined;
      _timer = this.setInterval( () => { QuickCount( e.data ) }, e.data.timer_value );
      break;
    }
    case "quickListStop": {
      i = 0;
      clearInterval( _timer );
      _timer = undefined;
      break;
    }
    default:
      {
        this._default_message( e );
        break;
      }
  };
  return;
};