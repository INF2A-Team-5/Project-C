using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services
{
    public class Setuptests
    {
        private readonly int _i; 
        public Setuptests(int i)
        {
            _i = i;
        }
        public string gkhjfsd(bool r = false)
        {
            if (r)
            {
                return "true";
            }
            else
            {
                return "false";
            }
        }
    }
    public class Setuptestss
    {
        public string gkhjfsdd(int r)
        {
            if (r > 100)
            {
                return "false";
            }
            else
            {
                return "true";
            }
        }
        
    }
}