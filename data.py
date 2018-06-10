#encoding=utf-8
import json
import jieba

class nounPosList():
	def __init__(self,name):
		self.name=name
		self.posList=[]
#global variable
charPosList=[]

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

content=open("context/rawdata/HP1-17.txt","rb").read()
result=jieba.tokenize(str(content,'utf-8'))
for tk in result: 
	#print("word %s\t\t start: %d \t\t end:%d" % (tk[0],tk[1],tk[2]))
	recordCharPos(tk[0],tk[1])
cfile=open("context/freq/hp1-17charPos.txt",'a',encoding='utf8')
cdata={}
cdata['episode']='1'
cdata['chapter']='17'
cdata['character']=[]
for item in charPosList:
	cd={'name':item.name,
		'posList':item.posList}
	cdata['character'].append(cd)
json.dump(cdata,cfile,ensure_ascii=False,indent=4)
