function FindProxyForURL(url,host)
{
  if (shExpMatch(host,"*.google.com"))
      return "PROXY 10.23.8.125:3128"
  else if (shExpMatch(host,"*.google.com.hk"))
      return "PROXY 10.23.8.125:3128"
  else if (shExpMatch(host,"*.gstatic.com"))
      return "PROXY 10.23.8.125:3128"
  else if (shExpMatch(host,"*.facebook.com"))
      return "PROXY 10.23.8.125:3128"
  else if (shExpMatch(host,"*.twitter.com"))
      return "PROXY 10.23.8.125:3128"
  else if (shExpMatch(host,"twitter.com"))
      return "PROXY 10.23.8.125:3128"
  else if (shExpMatch(host,"*.googleusercontent.com"))
      return "PROXY 10.23.8.125:3128"
  else if (shExpMatch(host,"*.fbcdn.net"))
      return "PROXY 10.23.8.125:3128"
  else if (shExpMatch(host,"*.twimg.com"))
      return "PROXY 10.23.8.125:3128"
  else if (shExpMatch(host,"*.youtube.com"))
      return "PROXY 10.23.8.125:3128"
  else if (shExpMatch(host,"*.mitbbs.com"))
      return "PROXY 10.23.8.125:3128"
  else if (shExpMatch(host,"*.wordpress.com"))
      return "PROXY 10.23.8.125:3128"
  else if (shExpMatch(host,"*.appspot.com"))
      return "PROXY 10.23.8.125:3128"
  else if (shExpMatch(host,"*.blogspot.com"))
      return "PROXY 10.23.8.125:3128"
  else if (shExpMatch(host,"*.ytimg.com"))
      return "PROXY 10.23.8.125:3128"
  else if (shExpMatch(host,"*.box.net"))
      return "PROXY 10.23.8.125:3128"
  else if (shExpMatch(host,"*.blogger.com"))
      return "PROXY 10.23.8.125:3128"
  else if (shExpMatch(host,"*.googlelabs.com"))
      return "PROXY 10.23.8.125:3128"
  else if (shExpMatch(host,"*opencompute.org"))
      return "PROXY 10.23.8.125:3128"
  else if (shExpMatch(host,"*.bloomberg.com"))
      return "PROXY 10.23.8.125:3128"
  else if (shExpMatch(host,"mashable.com"))
      return "PROXY 10.23.8.125:3128"
  else if (shExpMatch(host,"*.slideshare.net"))
      return "PROXY 10.23.8.125:3128"
  else if (shExpMatch(host,"sourceforge.net"))
      return "PROXY 10.23.8.125:3128"
  else if (shExpMatch(host,"*.dropbox.com"))
      return "PROXY 10.23.8.125:3128"
  else if (shExpMatch(host,"*.vim.org"))
      return "PROXY 10.23.8.125:3128"
  else if (shExpMatch(host,"t.co"))
      return "PROXY 10.23.8.125:3128"
  else if (shExpMatch(host,"*.sstatic.net"))
      return "PROXY 10.23.8.125:3128"
  else
      return "DIRECT"
}

//http://impress.sinaapp.com/proxy.pac
