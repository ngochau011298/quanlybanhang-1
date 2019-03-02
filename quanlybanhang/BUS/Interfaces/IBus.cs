﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BUS.Interfaces
{
    public interface IBus<T> where T:class
    {
        void GetAll();
        void GetById(int id);
        void Add(T entity);
        void Edit(T entity);
        void Delete(int id);
    }
}
