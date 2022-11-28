import os
import re
import math
import json
import js2py
import imagehash
import requests
import pillow_avif
from PIL import Image
from urllib.request import urlopen, Request
from urllib.parse import urlparse
from urllib.error import HTTPError
from bs4 import BeautifulSoup

class Hitomi:
  def __init__(self):
    self.response = urlopen("https://ltn.hitomi.la/gg.js")
    self.ggjs = self.response.read() #self.ggjs = "'use strict'; gg = {m: function(g){ return '123'; }, s: function(h){ return '456'; }, b: '7'};"
    self.gg = js2py.eval_js(self.ggjs.decode('utf-8'))
  

  def subdomain_from_url(self, url, base):
    retval = 'b'
    if base:
      retval = base
    
    b = 16
    
    r = re.compile(r'\/[0-9a-f]{61}([0-9a-f]{2})([0-9a-f])')
    m = r.search(url)
    if not m:
      return 'a'
    
    g = int(m[2]+m[1], b)
    if not math.isnan(g):
      retval = chr(97 + self.gg.m(g)) + retval
    
    return retval


  def url_from_url(self, url, base):
    return re.sub(r'\/\/..?\.hitomi\.la\/', '//'+self.subdomain_from_url(url, base)+'.hitomi.la/', url)


  def full_path_from_hash(self, hash):
    return self.gg.b+self.gg.s(hash)+'/'+hash


  def real_full_path_from_hash(self, hash):
    return re.sub(r'/^.*(..)(.)$/', '$2/$1/'+hash, hash)


  def url_from_hash(self, galleryid, image, dir, ext):
    ext = ext or dir or image['name'].split('.').pop()
    dir = dir or 'images'
    
    return 'https://a.hitomi.la/'+dir+'/'+self.full_path_from_hash(image['hash'])+'.'+ext


  def url_from_url_from_hash(self, galleryid, image, dir, ext, base):
    if 'tn' == base:
      return self.url_from_url('https://a.hitomi.la/'+dir+'/'+self.real_full_path_from_hash(image.hash)+'.'+ext, base);
    else:
      return self.url_from_url(self.url_from_hash(galleryid, image, dir, ext), base)



def save(headers, url):
  img_hash = ''
  
  if not url:
    print("[{0}] Error: img url not found!".format(iUrl))
    return
  else:
    try:
      response = requests.get(url, headers=headers, stream=True)
    except HTTPError as err:
      print("[{0}] Error: HTTPError {1}, {2}".format(iUrl, err.code, url))
      return
    
    try:
      urlp = urlparse(url)
      img = Image.open(response.raw)
      img_ext = urlp.path.split('.').pop()
      img_hash = str(imagehash.average_hash(img)) + '.' + img_ext
      img.save(output_path + '\\' + img_hash)

      print("[{0}] Success: {1}".format(iUrl, img_hash))
    except Exception as ex:
      print(url)
      print("[{0}] Error: {1}".format(iUrl, ex))
      return


def download(url):
  headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0'}
  img_url = ""

  urlp = urlparse(url)

  try:
    response = urlopen(url)
  except HTTPError as err:
    print("[{0}] Error: HTTPError {1}, {2}".format(iUrl, err.code, url))
    return
  
  html = response.read()
  soup = BeautifulSoup(html, 'html.parser')

  if "hitomi.la" in url:
    galleryid = re.search(r'(?:\/)(\d+)(?:.html)', urlp.path).group(1)
    page = int(urlp.fragment) - 1

    try:
      response = urlopen("http://ltn.hitomi.la/galleries/"+galleryid+".js")
    except HTTPError as err:
      print("[{0}] Error: HTTPError {1}, {2}".format(iUrl, err.code, url))
      return

    html = response.read()
    data = json.loads(html[17:]) # remove len("var galleryinfo = ") = 17

    h = Hitomi()
    headers['Referer'] = urlp.scheme + '://' + urlp.netloc + urlp.path
    img_url = h.url_from_url_from_hash(galleryid, data['files'][page], 'webp' if not data['files'][page]['hasavif'] else 'avif', None, 'a')

  if "doujins.com" in url:
    data_link = '#' + urlp.fragment
    img_url = soup.find_all("img", {"class":"doujin active", "data-link":data_link})[0].get('data-file')

  if "gelbooru.com" in url:
    img_url = soup.find("img", {"id":"image"})['src']

  save(headers, img_url)


def start():
  global iUrl
  iUrl = 1
  urls = []

  with open(list_path) as file:
    for line in file:
        urls.append(line.rstrip())

  print("[i] Found url : {0} \n".format(len(urls)))

  if len(urls) >= 1:
    for url in urls:
      download(url)
      iUrl = iUrl + 1


def main():
  global dir_path
  global list_name
  global list_path
  global output_name
  global output_path

  print("[#] Doujin Downloader [#]")
  print("[i] Author\t\t : RizkyBlackHat")
  print("[i] Supported sites\t : hitomi.la, doujins.com, gelbooru.com\n")

  dir_path = os.path.dirname(os.path.realpath(__file__))

  list_name = input("[>] Enter the url list file name : ")
  list_path = os.path.join(dir_path, "list", list_name)
  if not os.path.isfile(list_path):
    print("[!] File input not found!")
    quit()
  
  output_name = input("[>] Enter name output directory : ")
  output_path = os.path.join(dir_path, "output", output_name)
  if not os.path.isdir(output_path):
    try:
      os.makedirs(output_path)
    except:
      print("[!] Can't make output directory!")

  start()



if __name__ == '__main__':
  try:
    main()
  except KeyboardInterrupt:
    print()