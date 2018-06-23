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
    elif(name==""):
        targetName=""
    """
    targetName=""
    if(name=="哈利"):
        targetName="哈利波特"
    elif(name=="鄧不利多" or name=="阿不思"):
        targetName="阿不思鄧不利多"
    elif(name=="阿不福思"):
        targetName="阿不福思鄧不利多"
    elif(name=="穆敵"or name=="阿拉特"or name=="瘋眼"or name=="瘋眼穆敵"):
        targetName="阿拉特穆敵"
    elif(name=="飛七"):
        targetName="阿各飛七"
    elif(name=="木透"):
        targetName="奥利佛木透"
    elif(name=="萊特"):
        targetName="鮑曼萊特"
    elif(name=="巴堤"):
        targetName="巴堤柯羅奇"
    elif(name=="柏莎" or name=="喬金"):
        targetName="柏莎喬金"
    elif(name=="貝拉"or name=="特里克斯"or name=="貝拉特里克斯"):
        targetName="貝拉雷斯狀"
    elif(name=="比爾"):
        targetName="比爾衛斯理"
    elif(name=="佩迪魯"or name=="彼得"):
        targetName="彼得佩迪魯"
    elif(name=="查理"):
        targetName="查理衛斯理"
    elif(name=="達力"):
        targetName="達力德思禮"
    elif(name=="丁" or name=="湯馬斯"):
        targetName="丁湯馬斯"
    elif(name=="弗雷"):
        targetName="弗雷衛斯理"
    elif(name=="花兒"):
        targetName="花兒戴樂古"
    elif(name=="洛哈" or name=="吉德羅"):
        targetName="吉德羅洛哈"
    elif(name=="佳兒"):
        targetName="佳兒戴樂古"
    elif(name=="金利" or name=="俠鉤帽"):
        targetName="金利俠鉤帽"
    elif(name=="金妮"):
        targetName="金妮衛斯理"
    elif(name=="康尼留斯" or name=="夫子"):
        targetName="康尼留斯夫子"
    elif(name=="路平"):
        targetName="雷木思路平"
    elif(name=="喬丹" or name=="李"):
        targetName="李喬丹"
    elif(name=="莉莉"):
        targetName="莉莉波特"
    elif(name=="麗塔" or name=="史譏"):
        targetName="麗塔史譏"
    elif(name=="昆爵" or name=="盧夫"):
        targetName="盧夫昆爵"
    elif(name=="海格" or name=="魯霸"):
        targetName="魯霸海格"
    elif(name=="露娜"):
        targetName="露娜羅古德"
    elif(name=="瑪姬"):
        targetName="瑪姬德思禮"
    elif(name=="美黛"):
        targetName="美黛東施"
    elif(name=="妙麗" or name=="格蘭傑"):
        targetName="妙麗格蘭傑"
    elif(name=="茉莉"):
        targetName="茉莉普瑞"
    elif(name=="奈威"):
        targetName="奈威隆巴頓"
    elif(name=="勒梅"):
        targetName="尼樂勒梅"
    elif(name=="潘妮" or name=="清水"):
        targetName="潘妮清水"
    elif(name=="潘西"):
        targetName="潘西帕金森"
    elif(name=="德思禮太太" or name=="佩妮"):
        targetName="佩妮德思禮"
    elif(name=="喬治"):
        targetName="喬治衛斯理"
    elif(name=="榮恩"):
        targetName="榮恩衛斯理"
    elif(name=="石內卜" or name=="賽佛勒斯"):
        targetName="賽佛勒斯石內卜"
    elif(name=="水仙"):
        targetName="水仙馬份"
    elif(name=="瑞斗" or name=="湯姆"):
        targetName="湯姆瑞斗"
    elif(name=="桃樂絲" or name=="恩不理居"):
        targetName="桃樂絲恩不理居"
    elif(name=="天狼星" or name=="布萊克"):
        targetName="天狼星布萊克"
    elif(name=="德思禮先生" or name=="威農"):
        targetName="威農德思禮"
    elif(name=="喀浪" or name=="維克多"):
        targetName="維克多喀浪"
    elif(name=="文妲" or name=="布朗"):
        targetName="文妲布朗"
    elif(name=="特裡勞妮" or name=="西碧" or name=="西碧特裡勞妮"):
        targetName="西碧崔老妮"
    elif(name=="西莫" or name=="斐尼干"):
        targetName="西莫斐尼干"
    elif(name=="西追"):
        targetName="西追迪哥里"
    elif(name=="小巴堤"):
        targetName="小巴堤柯羅奇"
    elif(name=="小仙女" or name=="東施"):
        targetName="小仙女東施"
    elif(name=="亞瑟"):
        targetName="亞瑟衛斯理"
    elif(name=="卡卡夫" or name=="伊果"):
        targetName="伊果卡卡夫"
    elif(name=="贊諾"):
        targetName="贊諾羅古德"
    elif(name=="詹姆"):
        targetName="詹姆波特"
    elif(name=="跩哥" or name=="馬份"):
        targetName="跩哥馬份"
    elif(name=="魯休斯"):
        targetName="魯休斯馬份"
    else:
        return False
    for item in posList:
        recordCharPos(targetName,item);
    return True

for e in range(2,3):
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
            item.posList.sort()
            cd={'name':item.name,
                'posList':item.posList}
            cdata['character'].append(cd)
        json.dump(cdata,cfile,ensure_ascii=False,indent=4)
        charPosList.clear()
