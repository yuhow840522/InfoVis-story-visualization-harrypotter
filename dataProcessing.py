import json
characterDict=open("context/dictionary/userdict_hp_all_character.txt","r",encoding='utf8')
placeDict=open("context/dictionary/userdict_hp_all_place.txt","r",encoding='utf8')
characterList=[]
placeList=[]
charfreqList=[]
placefreqList=[]
episode=1
chap=0

#define character name and its initial value
for line in characterDict:	
	name=line.split(' ')[0]
	characterList.append(name)
	charfreqList.append(0)
characterDict.close()
#define place ..
for line in placeDict:
	name=line.split(' ')[0]
	placeList.append(name)
	placefreqList.append(0)
placeDict.close()

def characterFreq(query):
	for i in range( 0 ,len(characterList)):
		if(query==characterList[i]):
			charfreqList[i]+=1
			return True
	return False
	

def placeFreq(query):
	for i in range(0,len(placeList)):
		if(query==placeList[i]):
			placefreqList[i]+=1
			return True
	return False

def freqRecord():
	cdata={}
	cdata['episode']='1'
	cdata['chapter']=str(chap)
	cdata['people']=[]
	for i in range(0,len(characterList)):
		if(charfreqList[i]>0):
			cd={
			'name':characterList[i],
			'freq':str(charfreqList[i])
			}
			cdata['people'].append(cd)
			cfile=open('context/freq/characterFreq.txt','a')
	json.dump(cdata,cfile,ensure_ascii=False,indent=4)
	pdata={} 
	pdata['episode']='1'
	pdata['chapter']=str(chap)
	pdata['place']=[]
	for i in range(0,len(placeList)):
		if(placefreqList[i]>0):
			pd={
			'name':placeList[i], 
			'freq':str(placefreqList[i])  
			}
			pdata['place'].append(pd) 
			pfile=open('context/freq/placeFreq.txt','a')  
	json.dump(pdata,pfile,ensure_ascii=False,indent=4)

#episode 1
f=open("context/out_0514_1340_hp1.txt","r",encoding = 'utf8')
lastWord=""
last2Word=""
for line in f:
	l=line.replace("\n","").split(',')
	if((last2Word == "第" or lastWord == "第") and l[0]=="章"   ):
		if(chap>0):
			freqRecord()
		chap+=1				
	if(l[1]=="nr" or l[1]=="nrfg"):
		characterFreq(l[0])
	if(l[1]=="ns"):
		placeFreq(l[0])
	last2Word=lastWord
	lastWord=l[0]

freqRecord()
	
