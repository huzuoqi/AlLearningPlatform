# -*- coding: utf-8 -*-
import requests
import time
import json
import MySQLdb

# from requests.packages.urllib3.exceptions import InsecureRequestWarning

# requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
# -------------配置信息开始---------------------------
# 0
# 数据存储名称
this_sheetName = "人工智能前沿讲习"

# 1
# agent 【自己改一次就行】
this_Agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36"

# 从公众平台获取的信息
this_Cookie = "appmsglist_action_3879750013=card; _tc_unionid=eec97c25-55ba-4926-ae42-0992eb7c8aec; RK=KBvJhQBh01; ptcz=23fe1faf6809c48625840f69943c8752a273dca9dbdf856b819f4895da03cc95; pac_uid=0_0e7863bb363ff; iip=0; rewardsn=; wxtokenkey=777; uin=o2644668743; pgv_pvid=9353881728; pgv_info=ssid=s4398377728; ua_id=TuWFub2tEcHnj8CPAAAAABhiAX_GCCiJwCWD52yRV5M=; wxuin=46214450940335; cert=SgfT7ooXw8Zzi0mPFayhHDxWvKcEqxyb; ptui_loginuin=2644668743@qq.com; skey=@ikdTM95Ei; sig=h010d17911b6481308b10be844c921205662fc1bda599c920895751b600bff856c9feba47f26c29695b; master_key=rtXz58SeIur/6QS03klARorvS0JnxTKoT90KUeUwSow=; mm_lang=zh_CN; noticeLoginFlag=1; uuid=9301ad90f6b2f18218e462811f789f34; rand_info=CAESIBQ1imQkWA2Hsx/E/L8DK2ET8VGZBtbcJJN1NP/PbFEi; slave_bizuin=3879750013; data_bizuin=3879750013; bizuin=3879750013; data_ticket=HAuwIHQYQQq9hzLOys1rKG3vnU32VI+5eiEfoAKl9RyigEHrpYPUdRp4V7ZASVC7; slave_sid=X3cwdVlhQ2o1OURMUk5iWGhaNlNoX2xHZFpHOFRWSkRBS1Vxd2JGX0pZcUJ5ZUVZQU51V0NQaTE3NDlNYmFZOHdKSGI1d015dTdtekdvU0g0bFBkZ0ZBUUVoYWNmT3licld0V0R6SXhPUmx0cjJneUthY09WRDlMWml6V0ZkcXRLNUVBbjl3T25YdnlNWTEx; slave_user=gh_d7adba5f12eb; xid=e7af0796dff505b73b691d8bd119ed27"
# 账户token
this_token = "179009461"
# 公众号独一无二的一个id
this_fakeid = "MzIzNjc0MTMwMA=="

# 2
# fillder 中取得一些不变得信息
# req_id = "0614ymV0y86FlTVXB02AXd8p"
# uin 【自己改一次就行】
this_uin = "MjgxNjYwNDIzOA=="

# 【常需要修改的参数】
this_pass_ticket = "clmUx1yEBEpHPesljssk3h9x/h09JVih/rXw9/lVcvPkV8hEQjb6N9GA9oEvUyLd"
# 【常需要修改的参数】
this_appmsg_token = "1155_58KX%2B6CT9r2MpH8BG468crdNmI7gcg02VIr7ViInytPGG5WVAChRd4dmqsGKHX98XMgVzivcOnszsiuC"
# 【常需要修改的参数】
this_key = "0b1431e25a2ba4640dd3659422977c55822853af7d0010fba0f6633f5aa83e4901766019afe501631d9bf905abcf465bbf23b750ad328307084e67e903a8f63cb2c528a3546ca81f2880e5c2484d29b5de5ac025bda9f4712cabcc7e9512e277192ff57169452f5da580d4dac2e488e1088f95f6ceaec29a852cdf11e0870301"
# 3
# 【常需要修改的参数】 开始页码
begin_page = 1

# -------------配置信息结束--------------------------


# 目标url
url = "https://mp.weixin.qq.com/cgi-bin/appmsg"

Cookie = this_Cookie
headers = {
    "Cookie": Cookie,
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36",
}

"""
需要提交的data
以下个别字段是否一定需要还未验证。
注意修改yourtoken,number
number表示从第number页开始爬取，为5的倍数，从0开始。如0、5、10……
token可以使用Chrome自带的工具进行获取
fakeid是公众号独一无二的一个id，等同于后面的__biz
"""
token = this_token
fakeid = this_fakeid
# type在网页中会是10，但是无法取到对应的消息link地址，改为9就可以了
type = '9'
data1 = {
    "token": token,
    "lang": "zh_CN",
    "f": "json",
    "ajax": "1",
    "action": "list_ex",
    "begin": "365",
    "count": "5",
    "query": "",
    "fakeid": fakeid,
    "type": type,
}


# 毫秒数转日期
def getDate(times):
    # print(times)
    timearr = time.localtime(times)
    date = time.strftime("%Y-%m-%d %H:%M:%S", timearr)
    return date


# 获取阅读数和点赞数
def getMoreInfo(link):
    # 获得mid,_biz,idx,sn 这几个在link中的信息
    mid = link.split("&")[1].split("=")[1]
    idx = link.split("&")[2].split("=")[1]
    sn = link.split("&")[3].split("=")[1]
    _biz = link.split("&")[0].split("_biz=")[1]

    # fillder 中取得一些不变得信息
    # req_id = "0614ymV0y86FlTVXB02AXd8p"
    uin = this_uin
    pass_ticket = this_pass_ticket
    appmsg_token = this_appmsg_token
    key = this_key
    # 目标url
    url = "https://mp.weixin.qq.com/mp/getappmsgext"
    # 添加Cookie避免登陆操作，这里的"User-Agent"最好为手机浏览器的标识
    phoneCookie = "wxtokenkey=777; rewardsn=; wxuin=2529518319; devicetype=Windows10; version=62060619; lang=zh_CN; pass_ticket=4KzFV+kaUHM+atRt91i/shNERUQyQ0EOwFbc9/Oe4gv6RiV6/J293IIDnggg1QzC; wap_sid2=CO/FlbYJElxJc2NLcUFINkI4Y1hmbllPWWszdXRjMVl6Z3hrd2FKcTFFOERyWkJZUjVFd3cyS3VmZHBkWGRZVG50d0F3aFZ4NEFEVktZeDEwVHQyN1NrNG80NFZRdWNEQUFBfjC5uYLkBTgNQAE="
    headers = {
        "Cookie": phoneCookie,
        "User-Agent": "Mozilla/5.0 (Symbian/3; Series60/5.2 NokiaN8-00/012.002; Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/533.4 (KHTML, like Gecko) NokiaBrowser/7.3.0 Mobile Safari/533.4 3gpp-gba"
    }
    # 添加data，`req_id`、`pass_ticket`分别对应文章的信息，从fiddler复制即可。
    data = {
        "is_only_read": "1",
        "is_temp_url": "0",
        "appmsg_type": "9",
        'reward_uin_count': '0'
    }
    """
    添加请求参数
    __biz对应公众号的信息，唯一
    mid、sn、idx分别对应每篇文章的url的信息，需要从url中进行提取
    key、appmsg_token从fiddler上复制即可
    pass_ticket对应的文章的信息，也可以直接从fiddler复制
    """
    params = {
        "__biz": _biz,
        "mid": mid,
        "sn": sn,
        "idx": idx,
        "key": key,
        "pass_ticket": pass_ticket,
        "appmsg_token": appmsg_token,
        "uin": uin,
        "wxtoken": "777",
    }

    # 使用post方法进行提交
    content = requests.post(url, headers=headers, data=data, params=params).json()
    print(content)

    # 提取其中的阅读数和点赞数
    # print(content["appmsgstat"]["read_num"], content["appmsgstat"]["like_num"])
    try:
        readNum = content["appmsgstat"]["read_num"]
    except:
        readNum = 0
    try:
        likeNum = content["appmsgstat"]["like_num"]
    except:
        likeNum = 0
    try:
        comment_count = content["comment_count"]
        print("true:" + str(comment_count))
    except:
        comment_count = -1
        print("false:" + str(comment_count))
        comment_count = 0

    # 歇3s，防止被封
    time.sleep(3)
    return readNum, likeNum, comment_count


# 最大值365，所以range中就应该是73,15表示前3页
def getAllInfo(url, begin):
    # 拿一页，存一页
    messageAllInfo = []
    # begin 从0开始，365结束
    data1["begin"] = begin
    # 使用get方法进行提交
    content_json = requests.get(url, headers=headers, params=data1, verify=False).json()
    time.sleep(3)
    # 返回了一个json，里面是每一页的数据
    if "app_msg_list" in content_json:
        for item in content_json["app_msg_list"]:
            # 提取每页文章的标题及对应的url
            url = item['link']
            # print(url)
            readNum, likeNum, comment_count = getMoreInfo(url)
            info = {
                "title": item['title'],
                "readNum": readNum,
                "likeNum": likeNum,
                'comment_count': comment_count,
                "digest": item['digest'],
                "date": getDate(item['update_time']),
                "url": item['link']
            }
            messageAllInfo.append(info)
        # print(messageAllInfo)
        return messageAllInfo


# 写入数据库
def putIntoMysql(urlList):
    conn = MySQLdb.connect(host='localhost', port=3306, user='root', password="huzuoqi", charset='utf8',db='AI_platform')
    cur = conn.cursor()

    # 存
    if urlList is not None:
        for message in urlList:
            title=message.get("title")
            cur.execute('''
      insert into articles (title , readNum, likeNum, comment_count, digest,date,url) values (%s,%s,%s,%s,%s,%s,%s)
''', (message.get("title"),message.get("readNum"),message.get("likeNum"),message.get("comment_count"),message.get("digest"),message.get("date"),message.get("url")))

    # 关闭游标
    cur.close()
    # 在向数据库插入一条数据时必须要有这个方法，否则数据不会被真正的插入。
    conn.commit()
    # 关闭数据库连接
    conn.close()

def main():
    # messageAllInfo = []
    # 爬10页成功，从1页开始
    for i in range(begin_page, 365):
        begin = i * 5
        messageAllInfo = getAllInfo(url, str(begin))
        print('\033[1;31;40m')
        print('*' * 50)
        print("\033[7;31m第%s页！\033[1;31;40m\033[0m\033[1;31;40m" % i)  # 字体颜色红色反白处理
        print('*' * 50)
        print('\033[0m')

        # print("第%s页" % i)
        putIntoMysql(messageAllInfo)


if __name__ == '__main__':
    main()