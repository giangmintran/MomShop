using MOMShop.Dto.Collection;
using System.Collections.Generic;

namespace MOMShop.Services.Interfaces
{
    public interface ICollectionService
    {
        CollectionDto Create(CollectionDto input);
        CollectionDto Update(CollectionDto input);
        void Delete(int id);
        CollectionDto FindById(int id);
        List<CollectionDto> FindAll();
    }
}
