import { Button, Card, Input, Text, TextAlign } from '@alphacore/ui-kit'
import classNames from 'classnames'
import { Controller } from 'react-hook-form'
import logoAlphacore from '../../assets/logo-alphacore.svg'
import shell from '../../layouts/PageShell.module.scss'
import { emailPattern, useLoginPage } from './useLoginPage'
import styles from './LoginPage.module.scss'

export function LoginPage() {
  const { control, mutation, onSubmit, clearErrors } = useLoginPage()

  return (
    <div className={shell.root}>
      <div className={styles.panel}>
        <img
          className={styles.logoImg}
          src={logoAlphacore}
          alt="α-CORE"
          width={122}
          height={18}
          decoding="async"
        />
        <Card className={styles.card}>
          <div className={styles.brand}>
            <Text
              as="h1"
              align={TextAlign.CENTER}
              className={styles.heading}
            >
              Войдите в свой аккаунт
            </Text>
          </div>
          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <Controller
              name="email"
              control={control}
              rules={{
                validate: (value) => {
                  const t = value.trim()
                  if (!t) return 'Введите адрес электронной почты'
                  if (!emailPattern.test(t)) {
                    return 'Введите корректный адрес электронной почты'
                  }
                  return true
                },
              }}
              render={({ field, fieldState }) => (
                <div
                  className={classNames(
                    styles.field,
                    styles.fieldRequired,
                    fieldState.error && styles.fieldInvalid,
                  )}
                >
                  <Input
                    label="Адрес электронной почты"
                    type="text"
                    autoComplete="email"
                    value={field.value}
                    onChange={(e) => {
                      clearErrors(['email', 'password'])
                      field.onChange(e)
                    }}
                    ref={field.ref}
                    name={field.name}
                    error={fieldState.error?.message ?? null}
                    className={styles.input}
                    wrapperClassName={styles.inputShell}
                  />
                </div>
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{
                validate: (value) =>
                  value.length > 0 ? true : 'Введите пароль',
              }}
              render={({ field, fieldState }) => (
                <div
                  className={classNames(
                    styles.field,
                    styles.fieldRequired,
                    fieldState.error && styles.fieldInvalid,
                  )}
                >
                  <Input
                    label="Пароль"
                    passwordField
                    autoComplete="current-password"
                    placeholder=""
                    value={field.value}
                    onChange={(e) => {
                      clearErrors(['email', 'password'])
                      field.onChange(e)
                    }}
                    ref={field.ref}
                    name={field.name}
                    error={fieldState.error?.message ?? null}
                    className={styles.input}
                    wrapperClassName={styles.inputShell}
                  />
                </div>
              )}
            />
            <div className={styles.submitWrap}>
              <Button
                type="submit"
                variant="basic"
                className={styles.submit}
                loading={mutation.isPending}
              >
                Продолжить
              </Button>
            </div>
            <div className={styles.footer}>
              <a
                href="#help"
                className={classNames(
                  styles.footerLink,
                  styles.footerLinkLeft,
                )}
                onClick={(e) => e.preventDefault()}
              >
                Не удается войти в
                <br />
                систему?
              </a>
              <a
                href="#register"
                className={classNames(
                  styles.footerLink,
                  styles.footerLinkRight,
                )}
                onClick={(e) => e.preventDefault()}
              >
                <span>Регистрация</span>
                <span>аккаунта</span>
              </a>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
