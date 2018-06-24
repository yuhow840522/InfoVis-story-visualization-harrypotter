# encoding=utf-8

import csv
import jieba
import jieba.posseg as pseg

jieba.set_dictionary("../Head-first-Chinese-text-segmentation-master/data/dict.txt.big")
"""
jieba.load_userdict("../Head-first-Chinese-text-segmentation-master/data/userdict_hp_all_character.txt")
jieba.load_userdict("../Head-first-Chinese-text-segmentation-master/data/userdict_hp_all_place.txt")
"""
jieba.load_userdict("../Head-first-Chinese-text-segmentation-master/data/userdict_hp_all.txt")
content=open("../context/HP1-1.txt","rb").read()
words=pseg.cut(content)
with open("out_0514_1340.txt",'w',newline='',encoding='utf-8') as f:
    w=csv.writer(f)

    for word,flag in words:
        str=[word,flag]
        if(str[1]!='x'):
            w.writerow(str)
