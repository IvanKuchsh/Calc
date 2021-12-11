// Значения из текстовых инпутов
const totalCost = document.getElementById('total-cost'),
      anInitialFee = document.getElementById('an-initial-fee'),
      creditTerm = document.getElementById('credit-term');

// Значения из range инпутов
const totalCostRange = document.getElementById('total-cost-range'),
      anInitialFeeRange = document.getElementById('an-initial-fee-range'),
      creditTermRange = document.getElementById('credit-term-range');

// Итоговые значения
const totalAmountOfCredit = document.getElementById('amount-of-credit'),
      totalMonthyPayment = document.getElementById('monthy-payment'),
      totalRecommendedIncone = document.getElementById('recommended-incone');

// Все range
const inputsRange = document.querySelectorAll('.culc__item-range');

// Все input
const inputsNumber = document.querySelectorAll('.culc__item-input');

// Все кнопки с процентной ставкой
const bankBtns = document.querySelectorAll('.culc__choose-item');

const assignValueRange = () => {
    totalCost.value = totalCostRange.value;
    anInitialFee.value = anInitialFeeRange.value;
    creditTerm.value = creditTermRange.value;
}
assignValueRange();

const assignValueInput = () => {
    totalCostRange.value = totalCost.value;
    anInitialFeeRange.value = anInitialFee.value;
    creditTermRange.value = creditTerm.value;
}


const banks = [
    {
        name: 'alfa',
        precents: 8.7
    },
    {
        name: 'sberbank',
        precents: 8.4
    },
    {
        name: 'pochta',
        precents: 7.9
    },
    {
        name: 'tinkoff',
        precents: 9.2
    }
];

let currentPrecent = banks[0].precents;

bankBtns.forEach(bank => {
    bank.addEventListener('click', () => {
        bankBtns.forEach(item => {
            item.classList.remove('culc__choose-item_active');
        })
        bank.classList.add('culc__choose-item_active'); 
        takeActiveBank(bank)
    });
});


const takeActiveBank = currentActive => {
    const dataAttrName = currentActive.getAttribute('data-name');
    const currentBank = banks.find(bank => bank.name === dataAttrName);
    currentPrecent = currentBank.precents;
    calculation(totalCost.value, anInitialFee.value, creditTerm.value);
};

inputsRange.forEach(input => {
    input.addEventListener('input', () => {
        assignValueRange();
        calculation(totalCost.value, anInitialFee.value, creditTerm.value);
    });
});

inputsNumber.forEach(input => {
    input.addEventListener('input', () => {

        if (input.value[0] === '0') {
            input.value = input.value.replace(/0/, '')
        }

        if (input.getAttribute('id') === 'credit-term' && +input.value > 20) {
            input.value = 20;
            assignValueInput();
            calculation(totalCost.value, anInitialFee.value, creditTerm.value);
            return
        }

        if (input.value.length >= 8 && +input.value > 10000000) {
            input.value = 10000000;
        }

        if (!input.value) {
            input.value = 0;
            assignValueInput();
            calculation(totalCost.value, anInitialFee.value, creditTerm.value);
        } else {
            assignValueInput();
            calculation(totalCost.value, anInitialFee.value, creditTerm.value);
        }
    });
});

const calculation = (totalCost = 0, anInitialFee = 100000, creditTerm = 1) => {
    /* 
        РК - Размер кредита
        ЕП - Ежемесячный платеж
        ПС - Процентная ставка
        КМ - Количество месяцев

        ЕП = (РК + (((РК / 100) * ПС) / 12) * КМ) / КМ
    */

    let monthyPayment // Ежемесячный платеж
    let lounAmount = totalCost - anInitialFee; // Размер кредита
    let interestRate = currentPrecent; // Процентная ставка
    let numberOfYears = creditTerm // Количество лет
    let numberOfMonths = 12 * numberOfYears // Количество месяцев

    monthyPayment = (lounAmount + (((lounAmount / 100) * interestRate) / 12) * numberOfMonths) / numberOfMonths;
    const monthyPaymentArounded = Math.round(monthyPayment);

    if (monthyPaymentArounded < 0) {
        totalAmountOfCredit.innerHTML = `0 <span>P</span>`;
        totalMonthyPayment.innerHTML = `0 <span>P</span>`;
        totalRecommendedIncone.innerHTML = `0 <span>P</span>`;
        return;
    } else {
        totalAmountOfCredit.innerHTML = `${lounAmount} <span>P</span>`;
        totalMonthyPayment.innerHTML = `${monthyPaymentArounded} <span>P</span>`;
        totalRecommendedIncone.innerHTML = `${monthyPaymentArounded + ((monthyPaymentArounded / 100) * 35)} <span>P</span>`;
    }
}



