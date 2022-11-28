// 1
var gg = {};

async function loadScript(url) {
  let response = await fetch(url);
  let script = await response.text();
  eval(script);
}

let scriptUrl = 'https://ltn.hitomi.la/gg.js'
loadScript(scriptUrl);

// 2
function subdomain_from_url(url, base) {
  var retval = 'b';
  if (base) {
    retval = base;
  }

  var b = 16;

  var r = /\/[0-9a-f]{61}([0-9a-f]{2})([0-9a-f])/;
  var m = r.exec(url);
  //console.log(url);
  //console.log(m);
  if (!m) {
    return 'a';
  }

  var g = parseInt(m[2] + m[1], b);
  if (!isNaN(g)) {
    retval = String.fromCharCode(97 + gg.m(g)) + retval;
  }
  //console.log(retval);
  return retval;
}

function url_from_url(url, base) {
  return url.replace(/\/\/..?\.hitomi\.la\//, '//' + subdomain_from_url(url, base) + '.hitomi.la/');
}


function full_path_from_hash(hash) {
  return gg.b + gg.s(hash) + '/' + hash;
}

function real_full_path_from_hash(hash) {
  return hash.replace(/^.*(..)(.)$/, '$2/$1/' + hash);
}

function url_from_hash(galleryid, image, dir, ext) {
  ext = ext || dir || image.name.split('.').pop();
  dir = dir || 'images';
  
  return 'https://a.hitomi.la/' + dir + '/' + full_path_from_hash(image.hash) + '.' + ext;
}

function url_from_url_from_hash(galleryid, image, dir, ext, base) {
  if ('tn' === base) {
    return url_from_url('https://a.hitomi.la/' + dir + '/' + real_full_path_from_hash(image.hash) + '.' + ext, base);
  }
  return url_from_url(url_from_hash(galleryid, image, dir, ext), base);
}

var galleryinfo = {
  'id': '2357540',
  'files': [
    { "width": 2815, "height": 4000, "haswebp": 1, "hash": "53d78801a032a06fd46a656fe63795cbcea76f0db3a51f548c495db8d10fdb14", "name": "01.jpg", "hasavif": 1 },
    { "name": "02.png", "hasavif": 1, "height": 4000, "width": 2786, "hash": "e9fb718dff03591b520a5ea5438e3f5c4a84bd0c37b99feecaac3e6eb37f54b4", "haswebp": 1 },
    { "name": "03.png", "hasavif": 1, "height": 4000, "width": 2808, "haswebp": 1, "hash": "da0cc8d2b04fb3e8062a44d0ec89eefae901a697daaca47c8a51085dd42151aa" },
    { "name": "04.png", "hasavif": 1, "hash": "dee9f940950c8ab5c076a07b6f6299b1efb2eb1485c78beaaeeb9831198895f5", "haswebp": 1, "height": 4000, "width": 2805 },
    { "hash": "13e0787e10bc471a8276563ed3e7149b5432e5d3060a5a0dbdc248a835349d5d", "haswebp": 1, "width": 2820, "height": 4000, "name": "05.png", "hasavif": 1 },
    { "height": 4000, "width": 2798, "haswebp": 1, "hash": "049ff18889d3089ced93bfc1842a889cb3373def70422942946770e9c234c532", "hasavif": 1, "name": "06.png" },
    { "width": 2828, "height": 4000, "haswebp": 1, "hash": "d6a3671f13d83656c51e6dfa69120a65d4d364cba3a3a7a6fcf7e834566fe670", "name": "07.png", "hasavif": 1 },
    { "name": "08.png", "hasavif": 1, "width": 2804, "height": 4000, "hash": "8344f30e310d9d7a21d6d73186324f36fb7e891d07dcc9317292241dd8192068", "haswebp": 1 },
    { "width": 2823, "height": 4000, "hash": "39247dc9fc699ea5055a60b17acb137d055190cc58cebac4f304838d307b85c8", "haswebp": 1, "name": "09.png", "hasavif": 1 },
    { "name": "10.png", "hasavif": 1, "width": 2808, "height": 4000, "hash": "ab5ef9276fba6b20f371d040221f98eaffcafd7c7be0a491095c51ea6c5eaec7", "haswebp": 1 },
    { "height": 4000, "width": 2821, "hash": "91b01ff6ccb93a85455f55e0c065242acfa763a74615778e5a862a1b4ab41270", "haswebp": 1, "name": "11.png", "hasavif": 1 },
    { "name": "12.png", "hasavif": 1, "hash": "0c8bd43110ed754c33c4bbc1503a37c11b128a3f7329bef4ceeedc16885fd203", "haswebp": 1, "height": 4000, "width": 2813 },
    { "name": "13.png", "hasavif": 1, "hash": "49096a142173394fa756b6860898a03cde97f988684fc6927a000b6caa97c8a1", "haswebp": 1, "height": 4000, "width": 2823 },
    { "width": 2809, "height": 4000, "hash": "b1b47c83926c10bc04d16a9447117e74d9a2172e97d51c9054528dfc38876bb4", "haswebp": 1, "hasavif": 1, "name": "14.png" },
    { "name": "15.png", "hasavif": 1, "height": 4000, "width": 2819, "hash": "c7c4a025f3c151d1045546e67838a31e9670b96be36243a9a2a8fbfed399747e", "haswebp": 1 },
    { "height": 4000, "width": 2810, "haswebp": 1, "hash": "c6c4794dc1cd99686a6105623f3f96989a64b8976e65f5801e1842088eb78ece", "hasavif": 1, "name": "16.png" },
    { "haswebp": 1, "hash": "7129df41277f96faf81a071c2f2ba6916313b6220763d7c2f052fb9ef86f0bd4", "height": 4000, "width": 2824, "name": "17.png", "hasavif": 1 },
    { "hash": "49c744f994387549eface2ff8c1c18c65edb32d869fce0dfec5602d3f92db038", "haswebp": 1, "width": 2798, "height": 4000, "name": "18.png", "hasavif": 1 },
    { "height": 4000, "width": 2820, "hash": "67946e5fd644241f51f0cf4f3fc1ad00cafd5734f5b135dea3024b71dbd21fa3", "haswebp": 1, "hasavif": 1, "name": "19.png" },
    { "width": 2814, "height": 4000, "hash": "ff2f65b00c02c990a4c073dfe6f334ac105548d7b9bfc96f94f6788d177dbd2c", "haswebp": 1, "hasavif": 1, "name": "20.jpg" }
  ]
}

console.log(url_from_url_from_hash(galleryinfo['id'], galleryinfo['files'][0], 'avif', undefined, 'a'));