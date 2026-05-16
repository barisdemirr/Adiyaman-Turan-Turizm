using ATT.Business.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATT.Business.Abstract
{
    public interface IHomePageService
    {
        HomePageDto GetHomePage();
    }
}
