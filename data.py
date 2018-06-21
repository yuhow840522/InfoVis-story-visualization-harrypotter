#encoding=utf-8
import json
import jieba
import os

class nounPosList():
    def __init__(self,name):
        self.name=name
        self.posList=[]
#global variable
charPosList=[]
dataDIR="context/rawdata/HP"
suffix="seg"

#dictionary
jieba.set_dictionary("context/dictionary/dict.txt.big")
jieba.load_userdict("context/dictionary/userdict_hp_all_character.txt")


#charList
charDict=open("context/dictionary/userdict_hp_all_character.txt","r",encoding='utf8')
charList=[]
for line in charDict:
    name=line.split(' ')[0]
    charList.append(name)
charDict.close()
"""
#placeList

placeDict=open("context/dictionary/userdict_hp_all_place.txt","r",encoding='utf8')
placeList=[]
for line in placeDict:
    name=line.split(' ')[0]
    placeList.append(name)
placeDict.close()
"""
#List function
def inCharList(query):
    for i in range(0,len(charList)):
        if(charList[i]==query):
            return True
    return False

def recordCharPos(query,pos):
    if(inCharList(query)):
        for i in range(0,len(charPosList)):
            if(charPosList[i].name==query):
                charPosList[i].posList.append(pos)
                return True
        charObj=nounPosList(query)
        charObj.posList.append(pos)
        charPosList.append(charObj)
        return True
    else:
        return False

def adjustPosList(name,posList):
    """
    elif(name=="飛七"):
        targetName="阿各飛七"
    elif(name=="穆敵"or name=="阿拉特"or name=="瘋眼"or name=="瘋眼穆敵"):
        targetName="阿拉特穆敵"
    elif(name=="木透"):
        targetName="奥利佛木透"
    elif(name=="巴堤"):
        targetName="巴堤柯羅奇"
    elif(name=="柏莎" or name=="喬金"):
        targetName="柏莎喬金"
    elif(name=="萊特"):
        targetName="鮑曼萊特"
    elif(name=="貝拉"or name=="特里克斯"or name=="貝拉特里克斯"):
        targetName="貝拉雷斯狀"
    elif(name=="比爾"):
        targetName="比爾衛斯理"
    elif(name=="佩迪魯"or name=="彼得"):
        targetName="彼得佩迪魯"
    elif(name=="佩迪魯"):
        targetName="彼得佩迪魯"
    """
    targetName=""
    if(name=="哈利"):
        targetName="哈利波特"
    elif(name=="鄧不利多" or name=="阿不思"):
        targetName="阿不思鄧不利多"
    else:
        return False
    for item in posList:
        recordCharPos(targetName,item);
    return True

for e in range(1,8):
    charPosList=[]
    contextDIR=dataDIR+str(e)+"seg"
    print(contextDIR)
    i=0
    for filename in os.listdir(contextDIR):
        i+=1
        print ("Loading: %s" % filename)
        content = open(os.path.join(contextDIR, filename), 'rb').read()
        result=jieba.tokenize(str(content,'utf-8'))
        for tk in result: 
            #print("word %s\t\t start: %d \t\t end:%d" % (tk[0],tk[1],tk[2]))
            recordCharPos(tk[0],tk[1])
            endPos=tk[2]
        j=0
        while(j<len(charPosList)):
            if(adjustPosList(charPosList[j].name,charPosList[j].posList)):
                charPosList.pop(j)
                continue
            j+=1
        cfile=open("context/freq/hp" + str(e)+"-"+str(i)+"charPos.txt",'a',encoding='utf8')
        ePos={}
        ePos['endPosition']=endPos
        json.dump(ePos,cfile)
        cdata={}
        cdata['episode']=str(e)
        cdata['chapter']=str(i)
        cdata['character']=[]
        for item in charPosList:
            cd={'name':item.name,
                'posList':item.posList}
            cdata['character'].append(cd)
        json.dump(cdata,cfile,ensure_ascii=False,indent=4)
        charPosList.clear()
        

        
