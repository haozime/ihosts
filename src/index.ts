import * as fs from 'fs'
import * as path from 'path'
import { red } from 'colors/safe';

class Ihosts {
  private hostsPath = '/etc/hosts'
  private startTag = `#### ihost start ~/${path.relative(process.env.HOME, process.cwd())} ####`
  private endTag = `#### ihost end   ####`
  private tagReg: RegExp = new RegExp(`${this.startTag}[\\s\\S]*?${this.endTag}`, 'g')

  async set (map) {
    try {
      const originHost = this.getHost() || ''
      let hosts: string[] = originHost.trim().split(/\n|\r\n/)
      let startLine = hosts.indexOf(this.startTag)
      let endLine = hosts.indexOf(this.endTag)

      startLine === -1 && (startLine = hosts.length + 1)
      endLine === -1 && (endLine = startLine)
      for (let i = startLine; i <= endLine; ++i) {
        hosts[i] = null
      }
      endLine = 0
      hosts = hosts.filter(o => o !== null)

      hosts[startLine] = this.startTag
      Object.keys(map).forEach(ip => {
        map[ip].forEach(domain => {
          hosts[++startLine] = `${ip} ${domain}`
        })
      })
      hosts[++startLine] = this.endTag
      const hostStr: string = hosts.join('\n') + '\n'
      fs.writeFileSync(this.hostsPath, hostStr, 'utf8')
    } catch (e) {
      console.log(red(e))
    }
  }

  // async remove () { // TODO
  //   // const originHost = this.getHost()
  // // }

  // // private clean () {
  //   const originHost = this.getHost()
  //   const newHost = originHost.replace(this.tagReg, '').trim() + '\n'
  //   fs.writeFileSync(this.hostsPath, newHost, 'utf8')
  // }

  private getHost () {
    return fs.readFileSync(this.hostsPath, 'utf8')
  }
}

export default new Ihosts()
