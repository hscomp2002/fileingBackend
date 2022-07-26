import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import GetAllPaginated from './dto/get-all-paginated-dto';
import { Rent } from './entities/rent.entity';
import { Mahdoode } from '../mahdoode/entities/mahdoode.entity';
import { In } from 'typeorm';
import { UserInfoDto } from 'src/customer/dto/user-info.dto';
import { Customer } from 'src/customer/entities/customer.entity';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(Rent)
    private rentRepository: Repository<Rent>,
    @InjectRepository(Mahdoode)
    private mahdoodeRepository: Repository<Mahdoode>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  private async parseQuery(
    query: GetAllPaginated,
    alowedMahdoodeIds: any,
  ): Promise<string> {
    let where = 'DATE(tarikh) >= DATE_SUB(now(), INTERVAL 6 MONTH)';

    let mahdoodeIds = [];
    if (query.mahdoode) {
      query.mahdoode.map((id) => {
        if (alowedMahdoodeIds.includes(+id)) {
          mahdoodeIds.push(+id);
        }
      });
    }

    if (mahdoodeIds.length === 0) {
      mahdoodeIds = alowedMahdoodeIds;
    }
    if (mahdoodeIds.length === 0) {
      return ' 1=0 ';
    }
    const mahdoode = await this.mahdoodeRepository.find({
      select: ['id', 'mahdoodeDets'],
      where: { id: In(mahdoodeIds) },
    });
    let mahdoodeString = '';
    for (const i in mahdoode) {
      for (const j in mahdoode[i].mahdoodeDets) {
        mahdoodeString +=
          mahdoodeString === ''
            ? `'${mahdoode[i].mahdoodeDets[j].name}'`
            : `,'${mahdoode[i].mahdoodeDets[j].name}'`;
      }
    }
    where += ` AND mahdoode in (${mahdoodeString})`;

    if (query.minRahn) {
      const minRahn = query.minRahn;
      where += ` AND rahn >=${minRahn}`;
    }

    if (query.maxRahn) {
      const maxRahn = query.maxRahn;
      where += ` AND rahn <=${maxRahn}`;
    }

    if (query.minEjare) {
      const minEjare =
        query.minEjare < +process.env.EJARE_MILION_BORDER
          ? +query.minEjare * 1000
          : query.minEjare;
      where += ` AND if(ejare<${+process.env
        .EJARE_MILION_BORDER} AND ejare>0,ejare*1000,ejare)>=${minEjare}`;
    }

    if (query.maxEjare) {
      const maxEjare =
        query.maxEjare < +process.env.MILION_BELLION_BORDER
          ? +query.maxEjare * 1000
          : query.maxEjare;
      where += ` AND if(ejare<${+process.env
        .MILION_BELLION_BORDER} AND ejare>0,ejare*1000,ejare)<=${maxEjare}`;
    }

    if (query.type && query.type.length) {
      let tmpType = '';
      for (const type of query.type) {
        tmpType += tmpType === '' ? `'${type}'` : `,'${type}'`;
      }
      where += ' AND `type` in (' + tmpType + ')';
    }

    if (query.tedadkhab && query.tedadkhab.length) {
      let more = false;
      let tmpTedadkhabe = '';
      for (const type of query.tedadkhab) {
        if (type === 'بیشتر') {
          more = true;
          continue;
        }
        tmpTedadkhabe += tmpTedadkhabe === '' ? `'${type}'` : `,'${type}'`;
      }

      if (more) {
        where +=
          ' AND ( `tedadkhab` in (' +
          (tmpTedadkhabe === '' ? "''" : tmpTedadkhabe) +
          ') or `tedadkhab` > 5)';
      } else {
        where += ' AND `tedadkhab` in (' + tmpTedadkhabe + ')';
      }
    }

    if (query.tabaghe && query.tabaghe.length) {
      let more = false;
      let tmpTabaghe = '';
      for (const type of query.tabaghe) {
        if (type === 'بیشتر') {
          more = true;
          continue;
        }
        tmpTabaghe += tmpTabaghe === '' ? `'${type}'` : `,'${type}'`;
      }

      if (more) {
        where +=
          ' AND ( `tabaghe` in (' +
          (tmpTabaghe === '' ? "''" : tmpTabaghe) +
          ') or `tabaghe` > 5 ) ';
      } else {
        where += ' AND `tabaghe` in (' + tmpTabaghe + ')';
      }
    }

    if (query.senbana && query.senbana.length) {
      let more = false;
      let tmpSenbana = '';
      for (const type of query.senbana) {
        if (type === 'بیشتر') {
          more = true;
          continue;
        }
        tmpSenbana += tmpSenbana === '' ? `'${type}'` : `,'${type}'`;
      }

      if (more) {
        where +=
          ' AND (`senbana` in (' +
          (tmpSenbana === '' ? "''" : tmpSenbana) +
          ') or `senbana` > 10 ) ';
      } else {
        where += ' AND `senbana` in (' + tmpSenbana + ')';
      }
    }

    if (query.options && query.options.length) {
      for (const option of query.options) {
        where += ' AND `' + option + "`='دارد'";
      }
    }

    return where;
  }

  async findAll(query: GetAllPaginated, userInfo: UserInfoDto) {
    const customer = await this.customerRepository.findOne({
      where: { id: userInfo.userId },
      select: ['id', 'mahdoode_id', 'customerMahdoodes'],
    });
    const alowedMahdoodeIds = [];
    if (customer.customerMahdoodes.length === 0) {
      alowedMahdoodeIds.push(customer.mahdoode_id);
    } else {
      customer.customerMahdoodes.map((mahdoode) => {
        alowedMahdoodeIds.push(mahdoode.mahdoode_id);
      });
    }

    const take = query.take || +process.env.PER_PAGE_COUNT;
    const skip = query.page - 1 || 0;
    const where: string = await this.parseQuery(query, alowedMahdoodeIds);

    // const test = await this.rentRepository
    //   .createQueryBuilder('ejare_eft')
    //   .where(where)
    //   .skip(skip)
    //   .take(take)
    //   .orderBy('ejare_eft.tarikh', 'DESC')
    //   .getSql();
    // console.log(test);
    // return test;
    const [data, count] = await this.rentRepository
      .createQueryBuilder('ejare_eft')
      .where(where)
      .skip(skip * take)
      .take(take)
      .orderBy('ejare_eft.tarikh', 'DESC')
      .getManyAndCount();

    return {
      data,
      pagination: {
        count,
        currentPage: skip + 1,
        lastPage: Math.ceil(count / take),
        perPage: take,
      },
    };
  }
}
