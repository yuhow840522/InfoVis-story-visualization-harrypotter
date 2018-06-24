# encoding=utf-8

import csv
import jieba
import jieba.posseg as pseg

jieba.set_dictionary("../Head-first-Chinese-text-segmentation-master/data/dict.txt.big")

jieba.load_userdict("../Head-first-Chinese-text-segmentation-master/data/userdict_hp_all_character.txt")
# jieba.load_userdict("../Head-first-Chinese-text-segmentation-master/data/userdict_hp_all_place.txt")

"""
jieba.load_userdict("../Head-first-Chinese-text-segmentation-master/data/userdict_hp_all.txt")
"""
content=open("../context/HP1.txt","rb").read()

result = jieba.tokenize(u'%s' %content, 'utf-8')

"""
words=pseg.cut(content)
with open("out_0609_hp1.txt",'w',newline='',encoding='utf-8') as f:
    w=csv.writer(f)

    for word,flag in words:
        str=[word,flag]
        if(str[1]!='x'):
            w.writerow(str)
"""

for tk in result:
    #tk[0]=tk[0].encode('ascii','ignore')
    print("%s \t %d \t %d \t" % (tk[0],tk[1],tk[2]))
